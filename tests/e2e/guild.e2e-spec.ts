import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import * as request from 'supertest';
import { PrismaService } from '../../src/database/prisma.service';
import { GuildModule } from '../../src/guild/guild.module';
import { resetDatabase } from '../common/resetDatabase';
import {
  createGuildMutation,
  createGuildMutationResult,
} from './queries/guild/createGuildMutation';
import {
  deleteGuildMutation,
  deleteGuildMutationResult,
} from './queries/guild/deleteGuildMutation';
import {
  disableCommandsMutation,
  disableCommandsMutationResult,
} from './queries/guild/disableCommandsMutation';
import {
  enableCommandsMutation,
  enableCommandsMutationResults,
} from './queries/guild/enableCommandsMutation';
import { guildQuery, guildQueryResult } from './queries/guild/guildQuery';
import { guildsQuery, guildsQueryResult } from './queries/guild/guildsQuery';
import {
  updateGuildMutation,
  updateGuildMutationResults,
} from './queries/guild/updateGuildMutation';

describe('Guild Resolvers (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        GuildModule,
        GraphQLModule.forRoot({
          autoSchemaFile: join(process.cwd(), '../../src/schema.gql'),
        }),
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterEach(async () => {
    await resetDatabase(prisma);
    await prisma.$disconnect();
  });
  afterAll(() => app.close());

  describe('#createGuild', () => {
    it('should return a guild', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: createGuildMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(createGuildMutationResult);
        });
    });

    it('should actually create the guild', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: createGuildMutation })
        .then(async () => {
          const res = await prisma.guild.findUnique({ where: { id: '420' } });
          expect(res).not.toBeNull();
        });
    });
  });

  describe('#findGuilds', () => {
    it('should return all the guilds', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: guildsQuery })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(guildsQueryResult);
        });
    });
  });

  describe('#findGuild', () => {
    it('should return just one guild', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: guildQuery })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(guildQueryResult);
        });
    });
  });

  describe('#updateGuild', () => {
    it('should return the updated guild', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: updateGuildMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(updateGuildMutationResults);
        });
    });

    it('should actually update the guild', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: updateGuildMutation })
        .then(async () => {
          const res = await prisma.guild.findUnique({
            where: { id: 'a' },
            include: { disabledCommands: true },
          });
          expect(res?.customPrefix).toEqual('!!');
          expect(res?.disabledCommands).toEqual([
            expect.objectContaining({ name: 'ping' }),
            expect.objectContaining({ name: 'pong' }),
          ]);
        });
    });
  });

  describe('#deleteGuild', () => {
    it('should return the deleted guild', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: deleteGuildMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(deleteGuildMutationResult);
        });
    });

    it('should actually delete the guild', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: deleteGuildMutation })
        .then(async () => {
          const res = await prisma.guild.findUnique({ where: { id: 'a' } });
          expect(res).toBe(null);
        });
    });
  });

  describe('#disableCommands', () => {
    it('should return updated guild', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: disableCommandsMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(disableCommandsMutationResult);
        });
    });

    it('should actually disable the commands', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: disableCommandsMutation })
        .then(async () => {
          const res = await prisma.guild.findUnique({
            where: { id: 'a' },
            select: { disabledCommands: { select: { name: true } } },
          });
          expect(res?.disabledCommands).toEqual([
            { name: 'ping' },
            { name: 'pong' },
          ]);
        });
    });
  });

  describe('#enableCommands', () => {
    it('should return updated guild', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: enableCommandsMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(enableCommandsMutationResults);
        });
    });

    it('should actually enable the commands', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: enableCommandsMutation })
        .then(async () => {
          const res = await prisma.guild.findUnique({
            where: { id: 'a' },
            select: { disabledCommands: { select: { name: true } } },
          });
          expect(res?.disabledCommands).toEqual([]);
        });
    });
  });
});
