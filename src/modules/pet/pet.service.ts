import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Adopt_Status, Prisma } from '@prisma/client';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.PetCreateInput) {
    try {
      const newPet = await this.prisma.pet.create({
        data: data,
      });
      return {
        data: newPet,
      };
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async findAll(opts: {
    _page?: string;
    _perPage?: string;
    type?: string;
    keyword?: string;
    fosterId?: string;
  }) {
    try {
      const data = await this.prisma.pet.findMany({
        where: {
          type: opts.type,
          name: {
            contains: opts.keyword,
          },
          fosterId: opts.fosterId,
        },
        include: { questions: true },
        skip: opts._page && opts._perPage && (+opts._page - 1) * +opts._perPage,
        take: opts._page && opts._perPage && +opts._perPage,
      });
      return { data };
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.pet.findUnique({
        where: { id },
        include: { questions: true },
      });
      if (!data) throw { message: 'Pet not found' };
      return { data };
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async update(id: string, data: Prisma.PetUpdateInput) {
    console.log('Update pet');
    if (data.adopted === false) {
      const owner = await this.prisma.adoptForm.findFirst({
        where: { petId: id, status: Adopt_Status.ACCEPTED },
      });
      if (owner) {
        return {
          err: { message: 'Pet already adopted' },
        };
      }
    }

    const oldQuestions = await this.prisma.question.findMany({
      where: { petId: id },
    });
    await this.prisma.question.deleteMany({
      where: { petId: id },
    });

    try {
      const updatedPet = await this.prisma.pet.update({
        where: { id },
        data,
        include: {
          questions: true,
        },
      });
      console.log(updatedPet);
      if (!updatedPet) throw { message: 'Pet not found' };
      return {
        data: updatedPet,
      };
    } catch (error) {
      console.log(error);
      await this.prisma.question.createMany({
        data: oldQuestions,
      });
      return {
        err: error,
      };
    }
  }

  async updateStatus(id: string, adopted: boolean) {
    try {
      const updatedPet = await this.prisma.pet.update({
        where: { id },
        data: { adopted },
        include: {
          questions: true,
        },
      });
      if (!updatedPet) throw { message: 'Pet not found' };
      return {
        data: updatedPet,
      };
    } catch (error) {
      return {
        err: error,
      };
    }
  }

  async remove(id: string) {
    try {
      const deletedPet = await this.prisma.pet.delete({ where: { id } });
      if (!deletedPet) throw { message: 'Pet not found' };
      return {
        data: deletedPet,
      };
    } catch (error) {
      return {
        err: error,
      };
    }
  }
}
