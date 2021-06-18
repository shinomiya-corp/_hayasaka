import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: "The user's Discord ID." })
  id!: string;

  @Field(() => String, { description: 'Discord tag, e.g., doraemon#4200' })
  tag!: string;

  @Field(() => Int)
  ribbons!: number;
}
