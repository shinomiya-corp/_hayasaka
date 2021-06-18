import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../src/database/prisma.service';
import { UserService } from '../../src/user/user.service';
import { resetDatabase } from '../common/resetDatabase';
import { doraemon, saber } from '../common/users';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
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
    const pepe = { id: '3', tag: 'pepe#3', ribbons: 3 };
    it('should insert and return a new user', async () => {
      const res = await service.create(pepe);
      expect(res).toEqual(expect.objectContaining(pepe));
      const _res = await prisma.user.findUnique({ where: { id: pepe.id } });
      expect(_res).not.toBeNull();
    });
  });

  describe('#update', () => {
    const newSaber = { ...saber, ribbons: 100 };
    it('should update and return the updated user', async () => {
      const res = await service.update(saber.id, newSaber);
      expect(res).toEqual({ ...saber, ribbons: 100 });
      const _res = await prisma.user.findUnique({ where: { id: saber.id } });
      expect(_res).toEqual(newSaber);
    });
  });

  describe('#findAll', () => {
    it('should return all the fucking users', async () => {
      const res = await service.findAll();
      expect(res).toEqual(expect.arrayContaining([saber, doraemon]));
    });

    it('should return an empty list if no users are found', async () => {
      await prisma.user.deleteMany();
      const res = await service.findAll();
      expect(res).toEqual([]);
    });
  });

  describe('#findOne', () => {
    it('should return saber', async () => {
      const res = await service.findOne('1');
      expect(res).toEqual(saber);
    });

    it('should return null if the user does not exist in db', async () => {
      const res = await service.findOne('does-not-exist');
      expect(res).toBeNull();
    });
  });

  describe('#delete', () => {
    it('should delete the user and return them', async () => {
      const res = await service.delete('1');
      expect(res).toEqual(saber);
      const _res = await prisma.user.findUnique({ where: { id: saber.id } });
      expect(_res).toBeNull();
    });

    it('should return null if the user does not exist', async () => {
      const res = await service.delete('does-not-exist');
      expect(res).toBeNull();
    });
  });

  describe('#incrRibbon', () => {
    it('should return the user and increase the ribbon count', async () => {
      const res = await service.incrRibbon({
        id: saber.id,
        tag: saber.tag,
        increment: 1,
      });
      expect(res).toEqual({ ...saber, ribbons: 2 });
      const _res = await prisma.user.findUnique({
        where: { id: saber.id },
        select: { ribbons: true },
      });
      expect(_res?.ribbons).toBe(2);
    });

    it('should create new user if they do not exist', async () => {
      const pepe = { id: '3', tag: 'pepe#3' };
      const res = await service.incrRibbon({
        ...pepe,
        increment: 1,
      });
      expect(res).toEqual({ ...pepe, ribbons: 1 });
      const _res = await prisma.user.findUnique({ where: { id: pepe.id } });
      expect(_res).not.toBeNull();
    });
  });

  describe('#decrRibbon', () => {
    it('should return the user and descrease ribbon count', async () => {
      const res = await service.decrRibbon({
        id: saber.id,
        tag: saber.tag,
        decrement: 1,
      });
      expect(res).toEqual({ ...saber, ribbons: 0 });
      const _res = await prisma.user.findUnique({
        where: { id: saber.id },
        select: { ribbons: true },
      });
      expect(_res?.ribbons).toBe(0);
    });

    it('should return null if decrement leads to negative and leave original value', async () => {
      const res = await service.decrRibbon({
        id: saber.id,
        tag: saber.tag,
        decrement: 2,
      });
      expect(res).toBeNull();
      const _res = await prisma.user.findUnique({
        where: { id: saber.id },
        select: { ribbons: true },
      });
      expect(_res?.ribbons).toBe(1);
    });
  });
});
