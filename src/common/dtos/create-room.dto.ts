import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Nombre de la sala',
    example: 'Sala de Planning Poker',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Nombre del usuario que crea la sala',
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'ID del usuario que crea la sala',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
