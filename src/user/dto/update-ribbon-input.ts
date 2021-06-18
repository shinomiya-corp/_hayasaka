import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class IncrRibbonInput {
  @Field(() => String, { description: "The user's Discord ID." })
  id!: string;

  @Field(() => String, { description: 'Discord tag, e.g., doraemon#4200' })
  tag!: string;

  // TODO class validation here
  @Field(() => Int)
  increment!: number;
}

@InputType()
export class DecrRibbonInput {
  @Field(() => String, { description: "The user's Discord ID." })
  id!: string;

  @Field(() => String, { description: 'Discord tag, e.g., doraemon#4200' })
  tag!: string;

  // TODO class validation here
  @Field(() => Int)
  decrement!: number;
}
