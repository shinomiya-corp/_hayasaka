import { Field, ObjectType } from '@nestjs/graphql';
import { Command } from 'src/commands/entities/command.entity';

@ObjectType()
export class Guild {
  @Field(() => String)
  id!: string;

  @Field(() => String, { nullable: true })
  customPrefix?: string;

  @Field(() => [Command], {
    nullable: true,
    description: 'Array of commands disabled in this server.',
  })
  disabledCommands?: Command[];
}
