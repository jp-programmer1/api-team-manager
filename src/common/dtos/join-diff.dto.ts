import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class JoinDiffDto {
  @ApiPropertyOptional({
    description: 'ID de la sala existente',
    example: 'room-123',
  })
  @IsString()
  @IsOptional()
  roomId?: string;

  @ApiPropertyOptional({
    description: 'Nano ID del usuario',
    example: 'abc123def456',
  })
  @IsString()
  @IsOptional()
  nanoId?: string;

  @ApiPropertyOptional({
    description: 'Nombre de la sala (solo si se está creando una nueva)',
    example: 'Mi Sala Diff',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'ID del usuario',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
