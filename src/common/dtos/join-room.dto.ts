import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class JoinRoomDto {
  @IsString()
  @IsOptional()
  roomId: string;

  @IsString()
  @IsOptional()
  nanoId: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
