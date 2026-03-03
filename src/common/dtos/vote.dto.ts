import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VoteDto {
  @ApiProperty({
    description: 'ID de la sala donde se vota',
    example: 'room-123',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({
    description: 'ID del usuario que vota',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Valor del voto',
    example: '5',
    enum: ['0', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '☕'],
  })
  @IsString()
  @IsNotEmpty()
  vote: string;
}
