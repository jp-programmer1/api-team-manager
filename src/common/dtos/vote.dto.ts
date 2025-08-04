import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VoteDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  vote: string;
}
