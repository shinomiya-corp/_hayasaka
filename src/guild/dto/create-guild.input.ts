import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGuildInput {
  @Field(() => String)
  id!: string;

  @Field(() => String, { nullable: true })
  customPrefix?: string;

  @Field(() => [String], {
    nullable: true,
    description: 'The commands to disable in this server.',
  })
  disabledCommands?: string[];
}
