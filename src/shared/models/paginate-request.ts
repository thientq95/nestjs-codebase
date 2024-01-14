import { ApiProperty } from '@nestjs/swagger';

export class PaginateRequest {
  @ApiProperty()
  limit: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  keyword?: string;
}
