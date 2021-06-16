import { Test, TestingModule } from '@nestjs/testing';
import { CommandsResolver } from './commands.resolver';
import { CommandsService } from './commands.service';

describe('CommandsResolver', () => {
  let resolver: CommandsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandsResolver, CommandsService],
    }).compile();

    resolver = module.get<CommandsResolver>(CommandsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
