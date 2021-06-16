import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Argument } from './argument.entity';

export enum CommandCategory {
  CURRENCY = 'currency',
  FUN = 'fun',
  GAMES = 'games',
  MUSIC = 'music',
  UTILITY = 'utility',
}

registerEnumType(CommandCategory, { name: 'CommandCategory' });

@Entity()
@ObjectType()
export class Command {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ unique: true })
  @Field()
  name!: string;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field(() => CommandCategory)
  category!: CommandCategory;

  @Column('text', { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  aliases?: string[];

  @OneToMany(() => Argument, (arg) => arg.command, {
    nullable: true,
    eager: true,
  })
  @Field(() => [Argument], { nullable: true })
  args?: Argument[];
}
