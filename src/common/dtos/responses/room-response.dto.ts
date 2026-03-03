import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
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
    description: 'Indica si el usuario ya votó',
    example: false,
  })
  hasVoted: boolean;

  @ApiProperty({
    description:
      'Voto del usuario (null si no ha votado o si los votos no están revelados)',
    example: '5',
    required: false,
  })
  vote?: string | null;
}

export class VoteResponseDto {
  @ApiProperty({
    description: 'ID del usuario que votó',
    example: 123,
  })
  userId: number;

  @ApiProperty({
    description: 'Valor del voto',
    example: '5',
  })
  vote: string;

  @ApiProperty({
    description: 'Nombre del usuario que votó',
    example: 'Juan Pérez',
  })
  username: string;
}

export class RoomResponseDto {
  @ApiProperty({
    description: 'ID único de la sala',
    example: 'room-123',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre de la sala',
    example: 'Sala de Planning Poker',
  })
  name: string;

  @ApiProperty({
    description: 'Lista de usuarios en la sala',
    type: [UserResponseDto],
  })
  users: UserResponseDto[];

  @ApiProperty({
    description: 'Lista de votos emitidos',
    type: [VoteResponseDto],
  })
  votes: VoteResponseDto[];

  @ApiProperty({
    description: 'Indica si los votos han sido revelados',
    example: false,
  })
  revealed: boolean;

  @ApiProperty({
    description: 'Fecha de creación de la sala',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: string;
}
