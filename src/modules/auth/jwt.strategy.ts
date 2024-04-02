import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FosterService } from '../foster/foster.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly fosterService: FosterService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: { id: string }) {
    try {
      const { data, err } = await this.fosterService.findOne({
        id: payload.id,
      });
      if (err) {
        throw new UnauthorizedException();
      }
      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
