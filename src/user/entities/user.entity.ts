import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: "The user's Discord ID." })
  id!: string;

  @Field(() => String, { description: 'Discord tag, e.g., doraemon#4200' })
  tag!: string;

  @Field(() => Int, { nullable: true })
  ribbons?: number;
}
