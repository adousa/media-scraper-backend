import { IsString } from 'class-validator';

export class CreateMediaDto {
  @IsString({ each: true })
  urls: Array<string>;
}
