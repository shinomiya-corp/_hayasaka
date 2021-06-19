import { registerEnumType } from '@nestjs/graphql';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
  description: 'Option to sort response in descending or ascending order.',
});
