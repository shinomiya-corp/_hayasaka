import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockReset } from 'jest-mock-extended';
import { GuildResolver } from './guild.resolver';
import { GuildService } from './guild.service';

describe('GuildResolver', () => {
  let resolver: GuildResolver;
  const mockGuildService = mock<GuildService>();

  beforeEach(async () => {
    mockReset(mockGuildService);

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
