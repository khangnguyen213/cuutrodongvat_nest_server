import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { RESPONSE_MESSAGES } from 'src/common/constants';
import { CreatePetDto } from './dto/pet.dto';
import { verify } from 'jsonwebtoken';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  async create(
    @Body() createPetDto: CreatePetDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const jwt = req.headers.authorization.replace('Bearer ', '');
      const user = verify(jwt, process.env.JWT_KEY);
      const { data, err } = await this.petService.create({
        ...createPetDto,
        foster: { connect: { id: user['id'] } },
        questions: {
          createMany: {
            data: createPetDto.questions.map((question) => ({
              content: question.content,
            })),
          },
        },
      });
      if (err) throw err;
      return res.status(201).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.ERROR_GETTING_DATA,
      });
    }
  }

  @Get()
  async findAll(
    @Query()
    query: {
      _page?: string;
      _perPage?: string;
      type?: string;
      keyword?: string;
      fosterId?: string;
    },
    @Res() res: Response,
  ) {
    try {
      const { data, err } = await this.petService.findAll(query);
      if (err) throw err;
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.ERROR_GETTING_DATA,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const { data, err } = await this.petService.findOne(id);
      if (err) throw err;
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.ERROR_GETTING_DATA,
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreatePetDto>,
    @Res() res: Response,
  ) {
    try {
      const { data, err } = await this.petService.update(id, {
        ...body,
        questions: {
          createMany: {
            data: body.questions.map((question) => ({
              content: question.content,
            })),
          },
        },
      });
      if (err) throw err;
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.ERROR_GETTING_DATA,
      });
    }
  }

  @Patch(':id/status/:status')
  async updateStatus(
    @Param('id') id: string,
    @Param('status') status: string,
    @Res() res: Response,
  ) {
    try {
      const { data, err } = await this.petService.updateStatus(
        id,
        status == 'true' ? true : false,
      );
      if (err) throw err;
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.ERROR_GETTING_DATA,
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const { data, err } = await this.petService.remove(id);
      if (err) throw err;
      return res.status(200).json({
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.ERROR_GETTING_DATA,
      });
    }
  }
}
