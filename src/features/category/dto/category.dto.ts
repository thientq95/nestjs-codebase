import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {
  @ApiProperty()
  id: number;
}
