import { Module } from '@nestjs/common';
import { AdoptService } from './adopt.service';
import { AdoptController } from './adopt.controller';

@Module({
  controllers: [AdoptController],
  providers: [AdoptService],
})
export class AdoptModule {}
