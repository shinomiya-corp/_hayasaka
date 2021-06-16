import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandsService } from './commands.service';
import { Command } from './entities/command.entity';
import { CreateCommandInput } from './dto/create-command.input';

@Resolver(() => Command)
export class CommandsResolver {
  constructor(private readonly commandsService: CommandsService) {}

  @Mutation(() => Int, { name: 'createCommand' })
  createCommand(
    @Args('createCommandInput', { type: () => [CreateCommandInput] })
    createCommandInput: CreateCommandInput[],
  ) {
    return this.commandsService.create(createCommandInput);
  }

  @Query(() => [Command], { name: 'commands' })
  findAll() {
    return this.commandsService.findAll();
  }

  @Query(() => Command, { name: 'command' })
  findOne(@Args('name', { type: () => String }) name: string) {
    return this.commandsService.findOne(name);
  }
}
