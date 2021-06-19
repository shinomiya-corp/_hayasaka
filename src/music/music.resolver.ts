import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { Ok } from '../common/entities/ok.dto';
import { TrackInfo } from './track.entity';

@Resolver()
export class MusicResolver {
  constructor(@Inject('MUSIC_SERVICE') private readonly client: ClientProxy) {}
  // TODO: add playlist
  // TODO: delete (one to many)
  // TODO: shuffle songs
  // TODO: search from youtube
  @Query(() => [TrackInfo])
  async getTracks(@Args('take', { type: () => Int }) take?: number) {
    return this.client.send('get_tracks', take || 0).toPromise();
  }

  @Mutation(() => Ok)
  async addTrack(
    @Args('guildId', { type: () => String }) guildId: string,
    @Args('url', { type: () => String }) url: string,
  ) {
    await this.client
      .send('add_tracks', { guildId, url })
      .toPromise()
      .catch((err) => {
        throw err;
      });
    return Ok;
  }
}
