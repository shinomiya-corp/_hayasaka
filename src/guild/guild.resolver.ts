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

  @Query(() => [Guild], { name: 'guild' })
  findAll() {
    return this.guildService.findAll();
  }

  @Query(() => Guild, { name: 'guild' })
  findOne(@Args('id', { type: () => String }) id: string) {
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
  removeGuild(@Args('id', { type: () => String }) id: string) {
    return this.guildService.remove(id);
  }
}
