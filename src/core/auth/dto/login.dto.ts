import { ApiProperty } from '@nestjs/swagger';
import { JwtToken } from './token.dto';
import { BasePayload } from 'src/shared/models/base-payload';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponse extends BasePayload<JwtToken> {}

export class LoginRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
