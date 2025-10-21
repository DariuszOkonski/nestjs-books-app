import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import cors from 'cors';

@Module({
  imports: [AuthorsModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

// next is :PUT /api/authors/:id
// Ćwiczenie 6

// npx prisma db push
// npx prisma db seed
// nest g mo authors
// nest g co authors/authors --flat --no-spec
// nest g s authors/authors --flat --no-spec
