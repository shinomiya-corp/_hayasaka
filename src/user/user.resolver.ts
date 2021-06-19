import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { FindUsersInput } from './dto/find-users.input';
import { DecrRibbonInput, IncrRibbonInput } from './dto/update-ribbon-input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput', { type: () => CreateUserInput })
    createUserInput: CreateUserInput,
  ) {
    const res = await this.userService.create(createUserInput);
    return res;
  }

  @Query(() => [User])
  // returns an empty array if no users were found
  findUsers(
    @Args('findUsersInput', { type: () => FindUsersInput, nullable: true })
    findUsersInput?: FindUsersInput,
  ) {
    return this.userService.findMany(findUsersInput);
  }

  @Query(() => User, { nullable: true })
  findUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput', { type: () => UpdateUserInput })
    updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.delete(id);
  }

  @Mutation(() => User)
  incrRibbon(
    @Args('incrRibbonInput', { type: () => IncrRibbonInput })
    incrRibbonInput: IncrRibbonInput,
  ) {
    return this.userService.incrRibbon(incrRibbonInput);
  }

  @Mutation(() => User)
  decrRibbon(
    @Args('decrRibbonInput', { type: () => DecrRibbonInput })
    decrRibbonInput: DecrRibbonInput,
  ) {
    return this.userService.decrRibbon(decrRibbonInput);
  }
}
