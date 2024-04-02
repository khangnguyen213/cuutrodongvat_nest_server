import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';

@Injectable()
export class FosterService {
  constructor(private prisma: PrismaService) {}

  async create(fosterData: Prisma.FosterCreateInput) {
    try {
      await this.prisma.foster.create({
        data: {
          ...fosterData,
          password: hashSync(fosterData.password, 10),
        },
      });
      return {
        data: 'Foster created successfully',
      };
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  findAll() {
    return this.prisma.foster.findMany();
  }

  async findOne(
    opts:
      | {
          id: string;
          email?: string;
        }
      | {
          id?: string;
          email: string;
        },
  ) {
    try {
      const data = await this.prisma.foster.findUnique({
        where: {
          ...opts,
        },
        include: {
          pets: true,
        },
      });
      if (!data) throw { message: 'Foster not found' };
      return { data };
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async update(id: string, fosterData: Prisma.FosterUpdateInput) {
    try {
      await this.prisma.foster.update({
        where: {
          id,
        },
        data: fosterData,
      });
      return {
        data: 'Foster updated successfully',
      };
    } catch (error) {
      return {
        err: error,
      };
    }
  }
}
