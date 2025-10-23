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
import { UsersService } from 'src/users/users.service';

@Controller('books')
export class BooksController {
  constructor(
    private bookService: BooksService, // private userService: UsersService,
    private userService: UsersService,
  ) {}

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

  @Post('/like/:bookId/:userId')
  @UseGuards(JwtAuthGuard)
  public async like(
    @Param('bookId', new ParseUUIDPipe()) bookId: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ) {
    if (!(await this.bookService.getById(bookId))) {
      throw new NotFoundException('Book not found');
    }

    if (!(await this.userService.getById(userId))) {
      throw new NotFoundException('User not found');
    }

    await this.bookService.like(bookId, userId);
    return { success: true };
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
