import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  sso: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiProperty()
  id: number;
}
