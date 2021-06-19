import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { CreateUserInput } from './dto/create-user.input';
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
    if (res) return res;
    throw new Error(`User with ID ${createUserInput.id} already exists.`);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput', { type: () => UpdateUserInput })
    updateUserInput: UpdateUserInput,
  ) {
    if (updateUserInput.ribbons && updateUserInput.ribbons < 0) {
      throw new Error(`Ribbon count cannot be zero!`);
    }
    const res = await this.userService.update(
      updateUserInput.id,
      updateUserInput,
    );
    if (res) return res;
    throw new Error(`User with ID ${updateUserInput.id} does not exist.`);
  }

  @Query(() => [User])
  findUsers() {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  async findOneUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    const res = await this.userService.delete(id);
    if (res) return res;
    throw new Error(`User with ID ${id} does not exists.`);
  }

  @Mutation(() => User)
  async incrRibbon(
    @Args('incrRibbonInput', { type: () => IncrRibbonInput })
    incrRibbonInput: IncrRibbonInput,
  ) {
    return this.userService.incrRibbon(incrRibbonInput);
  }

  @Mutation(() => User)
  async decrRibbon(
    @Args('decrRibbonInput', { type: () => DecrRibbonInput })
    decrRibbonInput: DecrRibbonInput,
  ) {
    const res = await this.userService.decrRibbon(decrRibbonInput);
    if (res) return res;
    throw new UserInputError(
      "This operation would result in the user's ribbon count becoming negative, which is not permitted.",
    );
  }

  // TODO top ribbons mutation via sorting and filtering on findUsers
}
