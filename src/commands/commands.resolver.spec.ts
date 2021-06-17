import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { CommandsResolver } from './commands.resolver';
import { CommandsService } from './commands.service';

const mockCommandsService = mock<CommandsService>();

describe('CommandsResolver', () => {
  let resolver: CommandsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandsResolver, CommandsService],
    })
      .overrideProvider(CommandsService)
      .useValue(mockCommandsService)
      .compile();

    resolver = module.get<CommandsResolver>(CommandsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
