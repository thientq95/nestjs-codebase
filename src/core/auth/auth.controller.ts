import { Body, Controller, Inject, Logger, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@ApiTags('auth')
@Controller('auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) { }

  @Post('/login')
  public async login(
    @Body() request: LoginRequest
  ): Promise<LoginResponse> {
    try {
      return await this.authService.signIn(request.email, request.password);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
