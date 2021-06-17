import { Field, InputType } from '@nestjs/graphql';
import { CommandCategory } from '@prisma/client';
import { CreateArgumentInput } from './create-argument.input';

@InputType()
export class CreateCommandInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => CommandCategory)
  category!: CommandCategory;

  @Field(() => [String], { nullable: true })
  aliases?: string[];

  @Field(() => [CreateArgumentInput], { nullable: true })
  args?: CreateArgumentInput[];
}
