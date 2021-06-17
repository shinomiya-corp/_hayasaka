import { Test, TestingModule } from '@nestjs/testing';
import { GuildResolver } from './guild.resolver';
import { GuildService } from './guild.service';

describe('GuildResolver', () => {
  let resolver: GuildResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildResolver, GuildService],
    }).compile();

    resolver = module.get<GuildResolver>(GuildResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
