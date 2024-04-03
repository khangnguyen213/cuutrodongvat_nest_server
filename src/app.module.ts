import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PetModule } from './modules/pet/pet.module';
import { FosterModule } from './modules/foster/foster.module';
import { UploadModule } from './modules/upload/upload.module';
import { AdoptModule } from './modules/adopt/adopt.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    PetModule,
    FosterModule,
    UploadModule,
    AdoptModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('In constructor of AppModule');
  }
}
