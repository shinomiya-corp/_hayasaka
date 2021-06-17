import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateGuildInput } from './create-guild.input';

@InputType()
export class UpdateGuildInput extends PartialType(CreateGuildInput) {
  @Field(() => String)
  id!: string;
}
