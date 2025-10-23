import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, UsersService],
  imports: [PrismaModule],
})
export class BooksModule {}
