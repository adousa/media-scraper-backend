import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetMediaDto {
  @IsNumberString()
  @IsOptional()
  page?: string;

  @IsNumberString()
  @IsOptional()
  pageSize?: string;

  @IsString()
  @IsOptional()
  search?: string;
}
