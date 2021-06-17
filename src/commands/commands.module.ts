import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CommandsResolver } from './commands.resolver';
import { CommandsService } from './commands.service';

@Module({
  providers: [CommandsResolver, CommandsService, PrismaService],
})
export class CommandsModule {}
