import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateArgumentInput {
  @Field()
  name!: string;

  @Field({ nullable: true })
  optional?: boolean;

  @Field({ nullable: true })
  multi?: boolean;
}
