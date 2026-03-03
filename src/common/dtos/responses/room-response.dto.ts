import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiPropertyOptional({
    description: 'Voto del usuario (solo visible cuando showVotes es true)',
    example: '5',
  })
  vote?: string;
}

export class RoomResponseDto {
  @ApiProperty({
    description: 'ID único de la sala (UUID)',
    example: 'a1b2c3d4-e5f6-...',
  })
  id: string;

  @ApiProperty({
    description: 'Nano ID de la sala (identificador corto)',
    example: 'abc12',
  })
  nanoId: string;

  @ApiProperty({
    description: 'Nombre de la sala',
    example: 'Sprint 42',
  })
  name: string;

  @ApiProperty({
    description: 'ID del usuario propietario de la sala',
    example: 123,
  })
  ownerId: number;

  @ApiProperty({
    description: 'Lista de usuarios en la sala',
    type: [UserResponseDto],
  })
  users: UserResponseDto[];

  @ApiProperty({
    description: 'Indica si los votos están visibles para todos',
    example: false,
  })
  showVotes: boolean;

  @ApiProperty({
    description: 'Fecha de creación de la sala',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: string;

  @ApiPropertyOptional({
    description: 'IID del issue de GitLab actualmente seleccionado',
    example: 42,
  })
  selectedIssueIid?: number;
}
