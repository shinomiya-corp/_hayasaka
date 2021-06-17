import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CommandCategory } from '@prisma/client';
import { Argument } from './argument.entity';

registerEnumType(CommandCategory, { name: 'CommandCategory' });

@ObjectType()
export class Command {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => CommandCategory)
  category!: CommandCategory;

  @Field(() => [String], { nullable: true })
  aliases?: string[];

  @Field(() => [Argument], { nullable: true })
  args?: Argument[];
}
