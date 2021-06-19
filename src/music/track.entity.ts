import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TrackInfo {
  @Field()
  title!: string;

  @Field()
  duration!: string;

  @Field()
  url!: string;

  @Field()
  thumbnailUrl!: string;
}
