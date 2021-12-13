import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, username, password): Promise<boolean> => {
    // TODO use different approach for authentication BasicAuth and env variables for username and password is not secure enough
    if (
      this.configService.get<string>('BASIC_AUTH_USER') === username &&
      this.configService.get<string>('BASIC_AUTH_PASS') === password
    ) {
      return true;
    }
    throw new UnauthorizedException();
  };
}
