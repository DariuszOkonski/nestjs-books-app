import {
  Controller,
  Get,
  Post,
  Delete,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get('/')
  getAll() {
    return this.bookService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const book = await this.bookService.getById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  public create(@Body() bookData: CreateBookDTO) {
    return this.bookService.create(bookData);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() bookData: UpdateBookDTO,
  ) {
    if (!(await this.bookService.getById(id))) {
      throw new NotFoundException('Book not found');
    }

    await this.bookService.updateById(id, bookData);
    return { success: true };
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.bookService.getById(id))) {
      throw new NotFoundException('Book not found');
    }

    await this.bookService.deleteById(id);
    return { success: true };
  }
}
