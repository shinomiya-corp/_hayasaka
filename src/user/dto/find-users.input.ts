import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { SortDirection } from '../../common/entities/asc-or-desc.dto';

export enum FindUsersSortableFields {
  ribbons = 'ribbons',
}
registerEnumType(FindUsersSortableFields, { name: 'FindUserSortFields' });

@InputType()
class FindUserSortOptions {
  @Field(() => FindUsersSortableFields)
  by!: FindUsersSortableFields;

  @Field(() => SortDirection)
  in!: SortDirection;
}

@InputType()
export class FindUsersInput {
  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => FindUserSortOptions, { nullable: true })
  sort?: FindUserSortOptions;
}
