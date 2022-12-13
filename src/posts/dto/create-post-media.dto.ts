import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePostMediaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  message: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  medias: string[];
}
