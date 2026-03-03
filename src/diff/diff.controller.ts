import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { DiffRoomsService } from './diff-rooms.service';
import { JoinDiffDto } from '../common/dtos/join-diff.dto';
import { DiffRoomResponseDto } from '../common/dtos/responses/diff-response.dto';

@ApiTags('diff')
@Controller('diff')
export class DiffController {
  constructor(private readonly diffRoomsService: DiffRoomsService) {}

  @Post('join')
  @ApiOperation({
    summary: 'Crear o unirse a una sala de Diff',
    description:
      'Permite crear una nueva sala de Diff o unirse a una existente. Si se proporciona roomId o nanoId, se une a la sala existente. Si se proporciona name, crea una nueva sala.',
  })
  @ApiBody({
    type: JoinDiffDto,
    description: 'Datos para unirse o crear una sala Diff',
  })
  @ApiResponse({
    status: 200,
    description: 'Operación exitosa',
    type: DiffRoomResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  joinOrCreate(@Body() joinDiffDto: JoinDiffDto) {
    return this.diffRoomsService.joinOrCreate({
      roomId: joinDiffDto.roomId,
      nanoId: joinDiffDto.nanoId,
      name: joinDiffDto.name,
      username: joinDiffDto.username,
      userId: joinDiffDto.userId,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener información de una sala Diff',
    description:
      'Retorna la información completa de una sala Diff, incluyendo usuarios, texto y estado actual.',
  })
  @ApiParam({ name: 'id', description: 'ID de la sala', example: 'room-123' })
  @ApiResponse({
    status: 200,
    description: 'Información de la sala',
    type: DiffRoomResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  getRoom(@Param('id') roomId: string) {
    return this.diffRoomsService.getRoom(roomId);
  }

  @Delete(':roomId/users/:userId')
  @ApiOperation({
    summary: 'Eliminar un usuario de una sala Diff',
    description:
      'Elimina a un usuario específico de una sala Diff. Si no quedan usuarios, la sala se elimina automáticamente.',
  })
  @ApiParam({
    name: 'roomId',
    description: 'ID de la sala',
    example: 'room-123',
  })
  @ApiParam({ name: 'userId', description: 'ID del usuario', example: '123' })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado exitosamente',
    schema: {
      example: {
        success: true,
        message: 'Usuario eliminado de la sala',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Sala o usuario no encontrado' })
  removeUser(@Param('roomId') roomId: string, @Param('userId') userId: number) {
    try {
      const updatedRoom = this.diffRoomsService.removeUser(roomId, userId);
      return {
        success: true,
        message: 'Usuario eliminado de la sala',
        room: updatedRoom,
      };
    } catch (error: unknown) {
      throw new NotFoundException((error as Error).message);
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una sala Diff',
    description:
      'Elimina completamente una sala Diff y todos sus datos asociados.',
  })
  @ApiParam({ name: 'id', description: 'ID de la sala', example: 'room-123' })
  @ApiResponse({
    status: 200,
    description: 'Sala eliminada exitosamente',
    schema: {
      example: {
        success: true,
        message: 'Sala eliminada',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  removeRoom(@Param('id') roomId: string) {
    try {
      this.diffRoomsService.removeRoom(roomId);
      return {
        success: true,
        message: 'Sala eliminada',
      };
    } catch (error: unknown) {
      throw new NotFoundException((error as Error).message);
    }
  }
}
