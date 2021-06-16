import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateSuperuser(bearer: string) {
    return bearer === process.env.SUPERUSER_KEY;
  }
}
