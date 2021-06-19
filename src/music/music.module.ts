import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MusicResolver } from './music.resolver';

@Module({
  providers: [MusicResolver],
  imports: [
    ClientsModule.register([
      {
        name: 'MUSIC_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: process.env.MUSIC_SERVICE_REDIS_URL,
        },
      },
    ]),
  ],
})
export class MusicModule {}
