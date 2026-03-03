import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DiffUserResponseDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: 123,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
  })
  username: string;
}

export class DiffRoomResponseDto {
  @ApiProperty({
    description: 'ID único de la sala',
    example: 'a1b2c3d4-e5f6-...',
  })
  id: string;

  @ApiProperty({
    description: 'Nano ID de la sala (identificador corto)',
    example: 'abc12',
  })
  nanoId: string;

  @ApiPropertyOptional({
    description: 'Nombre de la sala',
    example: 'Mi Sala Diff',
  })
  name?: string;

  @ApiProperty({
    description: 'ID del usuario propietario de la sala',
    example: 123,
  })
  ownerId: number;

  @ApiProperty({
    description: 'Lista de usuarios en la sala',
    type: [DiffUserResponseDto],
  })
  users: DiffUserResponseDto[];

  @ApiPropertyOptional({
    description: 'Texto del lado original del diff',
    example: 'const x = 1;',
  })
  textOriginal?: string;

  @ApiPropertyOptional({
    description: 'Texto del lado modificado del diff',
    example: 'const x = 2;',
  })
  textModified?: string;

  @ApiProperty({
    description: 'Fecha de creación de la sala',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: string;
}
