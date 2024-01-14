import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateNewsDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  published: boolean = false;

  @ApiProperty()
  publish_at: Date | null;
}

export class UpdateNewsDTO extends PartialType(CreateNewsDTO) {
  @ApiProperty()
  id: number;
}
