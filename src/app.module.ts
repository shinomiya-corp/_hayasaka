import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CommandsModule } from './commands/commands.module';
import { GuildModule } from './guild/guild.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CommandsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: true,
    }),
    AuthModule,
    GuildModule,
    UserModule,
  ],
})
export class AppModule {}
