import { Test, TestingModule } from '@nestjs/testing';
import { ping, pong } from '../common/commands';
import { guildA, guildB } from '../common/guilds';
import { resetDatabase } from '../common/resetDatabase';
import { PrismaService } from '../../src/database/prisma.service';
import { CreateGuildInput } from '../../src/guild/dto/create-guild.input';
import { GuildService } from '../../src/guild/guild.service';

describe('GuildService', () => {
  let service: GuildService;
  // NOT a mocked PrismaService, we're connecting to the test db in Docker
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildService, PrismaService],
    }).compile();

    service = module.get<GuildService>(GuildService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => resetDatabase(prisma));

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should return a guild', async () => {
      const newGuild: CreateGuildInput = {
        id: 'ffsafdfpoefm',
        customPrefix: 'chika',
        disabledCommands: ['ping', 'pong'],
      };
      const res = await service.create(newGuild);
      await service.delete(newGuild.id);
      expect(res).toEqual({ ...newGuild, disabledCommands: [ping, pong] });
    });
  });

  describe('#findall', () => {
    it('should return at least 2 guilds', async () => {
      const res = await service.findAll();
      expect(res).toEqual(
        expect.arrayContaining([
          { ...guildA, disabledCommands: [ping] },
          { ...guildB, disabledCommands: [pong] },
        ]),
      );
    });
  });

  describe('#findOne', () => {
    it('should return the right guild', async () => {
      const res = await service.findOne('a');
      expect(res).toEqual({ ...guildA, disabledCommands: [ping] });
    });
  });

  describe('#update', () => {
    it('should return with updated values', async () => {
      const res = await service.update(guildA.id, {
        id: guildA.id,
        customPrefix: 'foo',
        disabledCommands: ['pong'],
      });
      expect(res).toEqual({
        ...guildA,
        customPrefix: 'foo',
        disabledCommands: [ping, pong],
      });
    });
  });

  describe('#delete', () => {
    it('should return deleted guild', async () => {
      const res = await service.delete(guildA.id);
      expect(res).toEqual({ ...guildA, disabledCommands: [ping] });
    });
  });

  describe('#disableCommands', () => {
    it('should return guild with updated disabled commands', async () => {
      const res = await service.disableCommands(guildA.id, ['ping', 'pong']);
      expect(res).toEqual({ ...guildA, disabledCommands: [ping, pong] });
    });
  });

  describe('#enableCommands', () => {
    it('should return guild with updated disabled commands', async () => {
      const res = await service.enableCommands(guildA.id, ['ping', 'pong']);
      expect(res).toEqual({ ...guildA, disabledCommands: [] });
    });
  });
});
