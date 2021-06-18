import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { UserResolver } from '../../src/user/user.resolver';
import { UserService } from '../../src/user/user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  const mockUserService = mock<UserService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
