import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dtos/register-auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async register(registrationData: RegisterDTO) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    const userData = {
      email: registrationData.email,
    };

    return this.usersService.create(userData, hashedPassword);
  }

  public async validateUser(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);

    if (user && user.password) {
      const passwordMatches = await bcrypt.compare(
        password,
        user.password.hashedPassword,
      );

      if (!passwordMatches) {
        return null;
      }
      const { password: _pw, ...result } = user;

      return result;
    }

    return null;
  }
}
