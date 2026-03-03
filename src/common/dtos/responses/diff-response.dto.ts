import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    description: 'Nano ID del usuario',
    example: 'abc123def456',
  })
  nanoId: string;
}

export class DiffRoomResponseDto {
  @ApiProperty({
    description: 'ID único de la sala',
    example: 'room-123',
  })
  roomId: string;

  @ApiProperty({
    description: 'Nano ID de la sala',
    example: 'abc123def456',
  })
  nanoId: string;

  @ApiProperty({
    description: 'Nombre de la sala',
    example: 'Mi Sala Diff',
  })
  name: string;

  @ApiProperty({
    description: 'Lista de usuarios en la sala',
    type: [DiffUserResponseDto],
  })
  users: DiffUserResponseDto[];

  @ApiProperty({
    description: 'Texto contenido en la sala',
    example: 'Este es el texto de ejemplo para la sala diff',
  })
  text: string;

  @ApiProperty({
    description: 'Fecha de creación de la sala',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: string;
}
