import { ObjectType, Field, Int, createUnionType } from '@nestjs/graphql';
import { BaseError } from '../../common/dto/error.entity';

@ObjectType()
export class User {
  @Field(() => String, { description: "The user's Discord ID." })
  id!: string;

  @Field(() => String, { description: 'Discord tag, e.g., doraemon#4200' })
  tag!: string;

  @Field(() => Int, { nullable: true })
  ribbons?: number;
}

@ObjectType({ implements: BaseError })
class RibbonValueError extends BaseError {}

export const UpdateRibbonResult = createUnionType({
  name: 'UpdateRibbonResult',
  types: () => [User, RibbonValueError],
});
