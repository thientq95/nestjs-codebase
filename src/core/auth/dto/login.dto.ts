import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  accessToken: string;
}

export class LoginRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
