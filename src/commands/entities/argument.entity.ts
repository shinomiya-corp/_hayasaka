import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Command } from './command.entity';

@ObjectType()
export class Argument {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field({ nullable: true })
  optional?: boolean;

  @Field({ nullable: true })
  multi?: boolean;

  @Field(() => Command)
  command!: Command;
}
