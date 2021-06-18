import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';
import { PrismaService } from '../../src/database/prisma.service';
import { UserModule } from '../../src/user/user.module';
import { resetDatabase } from '../common/resetDatabase';
import * as request from 'supertest';
import {
  createDupUserMutation,
  createUserMutation,
  createUserMutationResult,
} from './queries/user/createUserMutation';
import {
  findAllUserQuery,
  findAllUserQueryResult,
} from './queries/user/findAllUserQuery';
import {
  findOneNotExistUserQuery,
  findOneUserQuery,
  findOneUserQueryResult,
} from './queries/user/findOneUserQuery';
import {
  deleteNotExistsUserMutation,
  deleteUserMutation,
  deleteUserMutationResult,
} from './queries/user/deleteUserMutation';
import {
  incrRibbonMutation,
  incrRibbonMutationResult,
  incrRibbonNewUserMutation,
  incrRibbonNewUserMutationResult,
} from './queries/user/incrRibbonMutation';
import {
  decrRibbonMutation,
  decrRibbonMutationResult,
  decrRibbonNonUserMutation,
} from './queries/user/decrRibbonMutation';
import {
  updateNotExistsUserMutation,
  updateUserMutation,
  updateUserMutationResult,
  updateUserNegativeRibbonsMutation,
} from './queries/user/updateUserMutation';

describe('User Resolvers (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        GraphQLModule.forRoot({
          autoSchemaFile: join(process.cwd(), '../../src/schema.gql'),
        }),
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useLogger(false); // otherwise it pollutes ur console lol
    prisma = moduleRef.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterEach(async () => {
    await resetDatabase(prisma);
    await prisma.$disconnect();
  });
  afterAll(() => app.close());

  describe('#createUser', () => {
    it('should return the user created', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: createUserMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(createUserMutationResult);
        });
    });
    it('should return an error if user already exists', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: createDupUserMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeNull();
          expect(res.body.errors).not.toBeNull();
        });
    });
  });

  describe('#updateUser', () => {
    it('should return the user with updated values', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: updateUserMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(updateUserMutationResult);
        });
    });
    it('should return error if user does not exist', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: updateNotExistsUserMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeNull();
          expect(res.body.errors).not.toBeNull();
        });
    });
    it('should return error if ribbons count is negative', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: updateUserNegativeRibbonsMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeNull();
          expect(res.body.errors).not.toBeNull();
        });
    });
  });

  describe('#findAll', () => {
    it('should return saber and doraemon', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: findAllUserQuery })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(findAllUserQueryResult);
        });
    });
  });

  describe('#findOne', () => {
    it('should return requested user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: findOneUserQuery })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(findOneUserQueryResult);
        });
    });

    it('should return null if requested user does not exist', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: findOneNotExistUserQuery })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.user).toBeNull();
        });
    });
  });

  describe('#deleteUser', () => {
    it('should return the deleted user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: deleteUserMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(deleteUserMutationResult);
        });
    });
    it('should return an error if user to delete does not exist', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: deleteNotExistsUserMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeNull();
          expect(res.body.errors).not.toBeNull();
        });
    });
  });

  describe('#incrRibbon', () => {
    it('should return user with increased ribbon count', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: incrRibbonMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(incrRibbonMutationResult);
        });
    });

    it('should return for new users with initialized ribbon count', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: incrRibbonNewUserMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(incrRibbonNewUserMutationResult);
        });
    });
  });

  describe('#decrRibbon', () => {
    it('should return user with decreased ribbon count', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: decrRibbonMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(decrRibbonMutationResult);
        });
    });
    it('should return an error if user does not exist', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: decrRibbonNonUserMutation })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeNull();
          expect(res.body.errors).not.toBeNull();
        });
    });
  });
});
