import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdoptService } from './adopt.service';
import { Response } from 'express';
import { RESPONSE_MESSAGES } from 'src/common/constants';
import { CreateAdoptDto, UpdateStatusDto } from './dto/adopt.dto';
import { Adopt_Status } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithTokenData } from 'src/common/interfaces';

@Controller('adopt')
export class AdoptController {
  constructor(private readonly adoptService: AdoptService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Req() req: RequestWithTokenData, @Res() res: Response) {
    try {
      if (!req.user) throw { message: RESPONSE_MESSAGES.UNAUTHORIZED };
      const { data, err } = await this.adoptService.findAll({
        where: {
          pet: {
            fosterId: req.user.id,
          },
        },
        include: {
          answers: {
            select: {
              id: true,
              content: true,
              question: true,
            },
          },
        },
      });
      if (err) throw err;
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.UNKNOWN_ERROR,
      });
    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: string, @Res() res: Response) {
    try {
      const { data, err } = await this.adoptService.findOneById(+id);
      if (err) throw err;
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.UNKNOWN_ERROR,
      });
    }
  }

  @Post()
  async create(@Body() body: CreateAdoptDto, @Res() res: Response) {
    try {
      const adoptDetail = {
        ...body,
        pet: { connect: { id: body.petId } },
        status: Adopt_Status.PENDING,
        answers: {
          createMany: {
            data: body.answers.map((answer) => ({
              questionId: answer.questionId,
              content: answer.content,
            })),
          },
        },
      };
      delete adoptDetail.petId;
      const { data, err } = await this.adoptService.create(adoptDetail);
      if (err) throw err;
      res.status(201).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.UNKNOWN_ERROR,
      });
    }
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateStatusDto,
    @Res() res: Response,
  ) {
    try {
      const { data, err } = await this.adoptService.updateStatus(
        +id,
        body.status,
      );
      if (err) throw err;
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.UNKNOWN_ERROR,
      });
    }
  }
}
