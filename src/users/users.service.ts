import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  public getById(id: User['id']): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  public getByEmail(email: User['email']): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  // Przygotowujemy serwis ćwiczenie 2 create
  public async create(
    userData: Omit<User, 'id'>,
    password: string,
  ): Promise<User> {
    const { ...otherData } = userData;

    try {
      return await this.prismaService.user.create({
        data: {
          ...otherData,
          password: {
            create: {
              hashedPassword: password,
            },
          },
        },
      });
    } catch (error) {
      // TODO: chceckout error.code

      throw error;
    }
  }
}
