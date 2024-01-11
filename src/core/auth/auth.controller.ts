import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  UnauthorizedException,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Public } from './decorators/public.decorator';
import { GetCurrentUserId } from './decorators/get-current-user-id.decorator';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() request: LoginRequest): Promise<LoginResponse> {
    try {
      return await this.authService.signIn(request.email, request.password);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get('me')
  public async getProfile(@GetCurrentUserId() userId: number) {
    return await this.authService.getUserInfo(userId);
  }
}
