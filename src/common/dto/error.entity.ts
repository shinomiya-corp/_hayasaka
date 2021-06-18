import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export class BaseError {
  @Field(() => String)
  message!: string;
}
