import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { GuildResolver } from './guild.resolver';
import { GuildService } from './guild.service';

const mockGuildService = mock<GuildService>();

describe('GuildResolver', () => {
  let resolver: GuildResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildResolver, GuildService],
    })
      .overrideProvider(GuildService)
      .useValue(mockGuildService)
      .compile();

    resolver = module.get<GuildResolver>(GuildResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
