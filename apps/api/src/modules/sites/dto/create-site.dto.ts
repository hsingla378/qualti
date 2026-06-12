import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSiteDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(32)
  code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;
}
