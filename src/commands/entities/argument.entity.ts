import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Command } from './command.entity';

@Entity()
@ObjectType()
export class Argument {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  optional?: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  multi?: boolean;

  @ManyToOne(() => Command, (command) => command.args, { onDelete: 'CASCADE' })
  @Field(() => Command)
  command!: Command;
}
