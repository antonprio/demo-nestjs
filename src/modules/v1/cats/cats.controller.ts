import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Response as IResponse } from '../../../helpers/response.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<IResponse> {
    const data: IResponse = {
      code: 1,
      message: 'List Cats',
      data: this.catsService.findAll()
    };
    
    res.status(HttpStatus.OK).json(data);
    return;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    const data: IResponse = {
      code: 1,
      message: 'Cat Created!',
      data: createCatDto
    }
    this.catsService.create(createCatDto);
    res.status(HttpStatus.CREATED).json(data);
  }

  @Get(':name')
  findOne(@Param() params, @Res() res: Response) {
    const cats = this.catsService.findAll()
    const catByName = cats.filter(el => el.name === params.name);
    const data: IResponse = {
      code: 1,
      message: (catByName.length) ? 'Cat found' : 'Cat not found!',
      data: catByName
    }
    const statusCode = (catByName.length) ? HttpStatus.OK : HttpStatus.NOT_FOUND;

    res.status(statusCode).json(data);
  }
}