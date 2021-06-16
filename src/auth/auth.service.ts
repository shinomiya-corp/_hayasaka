import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  async validateSuperuser(bearer: string) {
    return bearer === this.configService.get('SUPERUSER_KEY');
  }
}
