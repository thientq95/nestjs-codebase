import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/features/user/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login.dto';
import { UserService } from 'src/features/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService) {}

  async signIn(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, name: user.name };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }
}
