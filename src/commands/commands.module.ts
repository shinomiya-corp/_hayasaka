import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsResolver } from './commands.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Command } from './entities/command.entity';
import { Argument } from './entities/argument.entity';

@Module({
  providers: [CommandsResolver, CommandsService],
  imports: [TypeOrmModule.forFeature([Command, Argument])],
})
export class CommandsModule {}
