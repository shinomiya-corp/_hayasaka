import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SuperuserGuard } from '../auth/superuser/superuser.guard';
import { CommandsService } from './commands.service';
import { CreateCommandInput } from './dto/create-command.input';
import { Command } from './entities/command.entity';

@Resolver(() => Command)
export class CommandsResolver {
  constructor(private readonly commandsService: CommandsService) {}

  @Query(() => [Command], { name: 'commands' })
  findAll() {
    return this.commandsService.findAll();
  }

  @Query(() => Command, { name: 'command' })
  findOne(@Args('name', { type: () => String }) name: string) {
    return this.commandsService.findOne(name);
  }

  @UseGuards(SuperuserGuard)
  @Mutation(() => [Command], {
    name: 'createCommand',
    description: 'Creates one to many commands.',
  })
  createCommand(
    @Args('commands', { type: () => [CreateCommandInput] })
    createCommandInput: CreateCommandInput[],
  ) {
    return this.commandsService.create(createCommandInput);
  }

  @UseGuards(SuperuserGuard)
  @Mutation(() => Int, { nullable: true })
  dropCommands() {
    return this.commandsService.drop();
  }

  @UseGuards(SuperuserGuard)
  @Mutation(() => Int, { nullable: true, name: 'seedCommands' })
  dropAndSeed(
    @Args('commands', { type: () => [CreateCommandInput] })
    createCommandInput: CreateCommandInput[],
  ) {
    return this.commandsService.dropAndSeed(createCommandInput);
  }
}
