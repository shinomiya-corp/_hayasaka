import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SuperuserStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(bearer: string): Promise<any> {
    console.log(`received bearer ---> `, bearer);
    const authorized = await this.authService.validateSuperuser(bearer);
    console.log(`inside strategy ---> authorized is `, authorized);
    if (!authorized) {
      throw new UnauthorizedException();
    }
    return authorized;
  }
}
