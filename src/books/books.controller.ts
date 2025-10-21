import {
  Controller,
  Get,
  Post,
  Delete,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Body,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';

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
  public create(@Body() bookData: CreateBookDTO) {
    return this.bookService.create(bookData);
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.bookService.getById(id))) {
      throw new NotFoundException('Book not found');
    }

    await this.bookService.deleteById(id);
    return { success: true };
  }
}
