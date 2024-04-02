import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { FosterService } from '../foster/foster.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_KEY,
        signOptions: { expiresIn: '999y' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, FosterService],
  exports: [JwtStrategy],
})
export class AuthModule {}
