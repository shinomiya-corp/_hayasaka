import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { PrismaService } from '../database/prisma.service';
import { CommandsService } from './commands.service';

const mockPrismaService = mock<PrismaService>();

describe('CommandsService', () => {
  let service: CommandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<CommandsService>(CommandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
