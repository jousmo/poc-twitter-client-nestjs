import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  message: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
