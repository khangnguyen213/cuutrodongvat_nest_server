import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Adopt_Status, Prisma } from '@prisma/client';

@Injectable()
export class AdoptService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.AdoptFormCreateInput) {
    try {
      const adopt = await this.prisma.adoptForm.create({
        data,
      });
      return {
        data: adopt,
      };
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async findAll(opts: Prisma.AdoptFormFindManyArgs) {
    try {
      const data = await this.prisma.adoptForm.findMany(opts);
      return {
        data,
      };
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async findOneById(id: number) {
    try {
      const data = await this.prisma.adoptForm.findUnique({
        where: {
          id,
        },
      });
      return {
        data,
      };
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async updateStatus(id: number, status: Adopt_Status) {
    try {
      const data = await this.prisma.adoptForm.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
      return {
        data,
      };
    } catch (error) {
      return {
        err: error,
      };
    }
  }
}
