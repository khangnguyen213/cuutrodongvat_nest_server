import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    console.log('Prisma connect MySQL...');
    this.$connect();
    console.log('Prisma connect MySQL success!');
  }

  disconnectDB() {
    this.$disconnect();
  }
}
