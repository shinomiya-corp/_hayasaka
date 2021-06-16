import { Module } from '@nestjs/common';
import { SuperuserStrategy } from './superuser.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule.register({ session: false })],
  providers: [SuperuserStrategy, AuthService],
})
export class AuthModule {}
