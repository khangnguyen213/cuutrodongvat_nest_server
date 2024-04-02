import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FosterService } from './foster.service';
import { CreateFosterDto, UpdateFosterDto } from './dto/foster.dto';
import { Response } from 'express';
import { GetTokenDto } from './dto/get-token.dto';
import { compareSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { GetDataDto } from './dto/get-data.dto';
import { Prisma } from '@prisma/client';
import { RESPONSE_MESSAGES } from 'src/common/constants';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithTokenData } from 'src/common/interfaces';

@Controller('foster')
export class FosterController {
  constructor(private readonly fosterService: FosterService) {}

  @Post()
  async create(@Body() createFosterDto: CreateFosterDto, @Res() res: Response) {
    try {
      const { data, err } = await this.fosterService.create(createFosterDto);
      if (err) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === 'P2002'
        ) {
          throw { message: RESPONSE_MESSAGES.EMAIL_ALREADY_EXISTS };
        }
        throw {
          message: err.message
            ? err.message
            : RESPONSE_MESSAGES.ERROR_CREATING_FOSTER,
        };
      }
      return res.status(201).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.UNKNOWN_ERROR,
      });
    }
  }

  @Post('/get-token')
  async getToken(@Body() body: GetTokenDto, @Res() res: Response) {
    try {
      const { data, err } = await this.fosterService.findOne({
        email: body.email,
      });
      if (err) {
        throw {
          message: err.message
            ? err.message
            : RESPONSE_MESSAGES.ERROR_FINDING_EMAIL,
        };
      }
      if (!compareSync(body.password, data.password))
        throw {
          message: RESPONSE_MESSAGES.PASSWORD_INVALID,
        };

      return res.status(200).json({
        data: sign({ id: data.id }, process.env.JWT_KEY, { expiresIn: '999y' }),
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.ERROR_GETTING_TOKEN,
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/get-data')
  async getData(@Req() req: RequestWithTokenData, @Res() res: Response) {
    try {
      if (!req.user) throw { message: RESPONSE_MESSAGES.INVALID_TOKEN };
      return res.status(200).json({
        data: req.user,
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
  findAll() {
    return this.fosterService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string, @Res() res: Response) {
    try {
      const { data, err } = await this.fosterService.findOne({ id });
      if (err) {
        throw {
          message: err.message
            ? err.message
            : RESPONSE_MESSAGES.ERROR_FINDING_FOSTER,
        };
      }
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.UNKNOWN_ERROR,
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async update(
    @Body() body: UpdateFosterDto,
    @Req() req: RequestWithTokenData,
    @Res() res: Response,
  ) {
    try {
      if (!req.user) throw { message: RESPONSE_MESSAGES.INVALID_TOKEN };
      const { data, err } = await this.fosterService.update(req.user.id, body);
      if (err) {
        throw {
          message: err.message
            ? err.message
            : RESPONSE_MESSAGES.ERROR_UPDATING_FOSTER,
        };
      }
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
          ? error.message
          : RESPONSE_MESSAGES.UNKNOWN_ERROR,
      });
    }
  }
}
