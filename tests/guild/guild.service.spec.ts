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

  afterEach(async () => {
    await resetDatabase(prisma);
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    const newGuild: CreateGuildInput = {
      id: 'once',
      customPrefix: 'once',
      disabledCommands: ['ping', 'pong'],
    };

    it('should return a guild', async () => {
      const res = await service.create(newGuild);
      expect(res).toEqual({ ...newGuild, disabledCommands: [ping, pong] });
    });

    it('should actually create the fucking guild', async () => {
      await service.create(newGuild);
      const res = await prisma.guild.findUnique({ where: { id: newGuild.id } });
      expect(res).not.toBeNull();
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
    const updateInput = {
      id: guildA.id,
      customPrefix: 'foo',
      disabledCommands: ['pong'],
    };
    const updated = { ...updateInput, disabledCommands: [ping, pong] };

    it('should return with updated values', async () => {
      const res = await service.update(guildA.id, updateInput);
      expect(res).toEqual(updated);
    });

    it('should actually update the fucking guild', async () => {
      await service.update(guildA.id, updateInput);
      const res = await prisma.guild.findUnique({
        where: { id: guildA.id },
        include: { disabledCommands: true },
      });
      expect(res).toEqual(updated);
    });
  });

  describe('#delete', () => {
    it('should return deleted guild', async () => {
      const res = await service.delete(guildA.id);
      expect(res).toEqual({ ...guildA, disabledCommands: [ping] });
    });

    it('should actually delete the fucking guild', async () => {
      await service.delete(guildA.id);
      const res = await prisma.guild.findUnique({ where: { id: guildA.id } });
      expect(res).toBeNull();
    });
  });

  describe('#disableCommands', () => {
    it('should return guild with updated disabled commands', async () => {
      const res = await service.disableCommands(guildA.id, ['ping', 'pong']);
      expect(res).toEqual({ ...guildA, disabledCommands: [ping, pong] });
    });

    it('should actually disable the fucking commands', async () => {
      await service.disableCommands(guildA.id, ['ping', 'pong']);
      const res = await prisma.guild.findUnique({
        where: { id: guildA.id },
        select: { disabledCommands: { select: { name: true } } },
      });
      expect(res?.disabledCommands).toEqual([
        { name: 'ping' },
        { name: 'pong' },
      ]);
    });
  });

  describe('#enableCommands', () => {
    it('should return guild with updated disabled commands', async () => {
      const res = await service.enableCommands(guildA.id, ['ping', 'pong']);
      expect(res).toEqual({ ...guildA, disabledCommands: [] });
    });

    it('should actually enable the fucking commands', async () => {
      await service.enableCommands(guildA.id, ['ping', 'pong']);
      const res = await prisma.guild.findUnique({
        where: { id: guildA.id },
        select: { disabledCommands: { select: { name: true } } },
      });
      expect(res?.disabledCommands).toEqual([]);
    });
  });
});
