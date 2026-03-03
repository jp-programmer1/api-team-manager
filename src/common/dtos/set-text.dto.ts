import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SetTextDto {
  @ApiPropertyOptional({
    description: 'ID de la sala',
    example: 'abc12-...',
  })
  @IsString()
  @IsOptional()
  roomId?: string;

  @ApiPropertyOptional({
    description: 'Nano ID de la sala',
    example: 'abc12',
  })
  @IsString()
  @IsOptional()
  nanoId?: string;

  @ApiProperty({
    description: 'Texto a establecer en la sala',
    example: 'const x = 1;',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description:
      'Indica si el texto corresponde al lado original o modificado del diff',
    enum: ['original', 'modified'],
    example: 'original',
  })
  @IsEnum(['original', 'modified'])
  @IsNotEmpty()
  type: 'original' | 'modified';
}
