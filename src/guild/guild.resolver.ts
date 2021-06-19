import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateGuildInput } from './dto/create-guild.input';
import { UpdateGuildInput } from './dto/update-guild.input';
import { Guild } from './entities/guild.entity';
import { GuildService } from './guild.service';

@Resolver(() => Guild)
export class GuildResolver {
  constructor(private readonly guildService: GuildService) {}

  @Mutation(() => Guild)
  createGuild(
    @Args('createGuildInput', { type: () => CreateGuildInput })
    createGuildInput: CreateGuildInput,
  ) {
    return this.guildService.create(createGuildInput);
  }

  @Query(() => [Guild])
  findGuilds() {
    return this.guildService.findAll();
  }

  @Query(() => Guild)
  findOneGuild(@Args('id', { type: () => String }) id: string) {
    return this.guildService.findOne(id);
  }

  @Mutation(() => Guild)
  updateGuild(
    @Args('updateGuildInput', { type: () => UpdateGuildInput })
    updateGuildInput: UpdateGuildInput,
  ) {
    return this.guildService.update(updateGuildInput.id, updateGuildInput);
  }

  @Mutation(() => Guild)
  deleteGuild(@Args('id', { type: () => String }) id: string) {
    return this.guildService.delete(id);
  }

  @Mutation(() => Guild)
  disableCommands(
    @Args('id', { type: () => String }) id: string,
    @Args('commands', { type: () => [String] }) commands: string[],
  ) {
    return this.guildService.disableCommands(id, commands);
  }

  @Mutation(() => Guild)
  enableCommands(
    @Args('id', { type: () => String }) id: string,
    @Args('commands', { type: () => [String] }) commands: string[],
  ) {
    return this.guildService.enableCommands(id, commands);
  }
}
