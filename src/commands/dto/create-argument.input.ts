import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArgumentInput {
  @Field()
  name!: string;

  @Field()
  optional!: boolean;

  @Field()
  multi!: boolean;
}
