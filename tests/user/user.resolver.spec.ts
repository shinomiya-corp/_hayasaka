import { Test, TestingModule } from '@nestjs/testing';
import { UserInputError } from 'apollo-server-express';
import { mock, mockReset } from 'jest-mock-extended';
import { UserResolver } from '../../src/user/user.resolver';
import { UserService } from '../../src/user/user.service';
import { doraemon, saber } from '../common/users';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let mockUserService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    })
      .overrideProvider(UserService)
      .useValue(mock<UserService>())
      .compile();
    resolver = module.get<UserResolver>(UserResolver);
    mockUserService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    mockReset(mockUserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('#createUser', () => {
    const pepe = { id: '3', tag: 'pepe#3', ribbons: 3 };
    it('should return the created user', async () => {
      jest.spyOn(mockUserService, 'create').mockResolvedValue(pepe);
      const res = await resolver.createUser(pepe);
      expect(res).toEqual(pepe);
    });

    it('should return an error if user already exists', async () => {
      jest.spyOn(mockUserService, 'create').mockResolvedValue(null);
      expect(() => resolver.createUser(saber)).rejects.toThrow();
    });
  });

  describe('#findAll', () => {
    it('should return all the users', async () => {
      jest
        .spyOn(mockUserService, 'findAll')
        .mockResolvedValue([saber, doraemon]);
      const res = await resolver.findAll();
      expect(res).toEqual(expect.arrayContaining([saber, doraemon]));
    });
  });

  describe('#findOne', () => {
    it('should return one user', async () => {
      jest.spyOn(mockUserService, 'findOne').mockResolvedValue(saber);
      const res = await resolver.findOne(saber.id);
      expect(res).toEqual(saber);
    });

    it('should return null if service returns null', async () => {
      jest.spyOn(mockUserService, 'findOne').mockResolvedValue(null);
      const res = await resolver.findOne(saber.id);
      expect(res).toBeNull();
    });
  });

  describe('#delete', () => {
    it('should return the deleted user', async () => {
      jest.spyOn(mockUserService, 'delete').mockResolvedValue(saber);
      const res = await resolver.deleteUser(saber.id);
      expect(res).toEqual(saber);
    });
    it('should throw an error if the user does not exist', () => {
      jest.spyOn(mockUserService, 'delete').mockResolvedValue(null);
      expect(() => resolver.deleteUser('does-not-exist')).rejects.toThrow();
    });
  });

  describe('#incrRibbon', () => {
    it('should return updated user', async () => {
      jest
        .spyOn(mockUserService, 'incrRibbon')
        .mockResolvedValue({ ...saber, ribbons: 2 });
      const res = await resolver.incrRibbon({
        id: saber.id,
        tag: saber.tag,
        increment: 1,
      });
      expect(res).toEqual({ ...saber, ribbons: 2 });
    });
  });

  describe('#decrRibbon', () => {
    it('should return updated user if decrement is valid', async () => {
      jest
        .spyOn(mockUserService, 'decrRibbon')
        .mockResolvedValue({ ...saber, ribbons: 0 });
      const res = await resolver.decrRibbon({
        id: saber.id,
        tag: saber.tag,
        decrement: 1,
      });
      expect(res).toEqual({ ...saber, ribbons: 0 });
    });

    it('should throw an error if decrement is invalid', async () => {
      jest.spyOn(mockUserService, 'decrRibbon').mockResolvedValue(null);
      expect(() =>
        resolver.decrRibbon({
          id: saber.id,
          tag: saber.tag,
          decrement: 1000,
        }),
      ).rejects.toThrow(UserInputError);
    });
  });
});
