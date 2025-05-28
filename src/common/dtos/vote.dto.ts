import { IsNotEmpty, IsString } from 'class-validator';

export class VoteDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  vote: string;
}
