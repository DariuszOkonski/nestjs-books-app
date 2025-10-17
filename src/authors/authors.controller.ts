import {
  Body,
  Controller,
  Get,
  Post,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dtos/create-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get('/')
  getAll() {
    return this.authorsService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const author = await this.authorsService.getById(id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  @Post('/')
  create(@Body() authorData: CreateAuthorDTO) {
    return this.authorsService.create(authorData);
  }
}
