import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from '../common/dtos/create-room.dto';
import { JoinRoomDto } from '../common/dtos/join-room.dto';
import { VoteDto } from '../common/dtos/vote.dto';
import { RoomResponseDto } from '../common/dtos/responses/room-response.dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva sala de Planning Poker',
    description:
      'Crea una nueva sala de Planning Poker y automáticamente une al usuario creador a la sala.',
  })
  @ApiBody({
    type: CreateRoomDto,
    description: 'Datos para crear una nueva sala',
  })
  @ApiResponse({
    status: 201,
    description: 'Sala creada exitosamente',
    type: RoomResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(createRoomDto.name, {
      username: createRoomDto.username,
      userId: createRoomDto.userId,
    });
  }

  @Post('join')
  @ApiOperation({
    summary: 'Unirse a una sala existente',
    description:
      'Permite a un usuario unirse a una sala existente de Planning Poker usando el ID de la sala o el nano ID del usuario.',
  })
  @ApiBody({
    type: JoinRoomDto,
    description: 'Datos para unirse a una sala existente',
  })
  @ApiResponse({
    status: 200,
    description: 'Unido a la sala exitosamente',
    type: RoomResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  joinRoom(@Body() joinRoomDto: JoinRoomDto) {
    return this.roomsService.joinRoom(
      joinRoomDto.roomId,
      joinRoomDto.username,
      joinRoomDto.userId,
      joinRoomDto.nanoId,
    );
  }

  @Post('vote')
  @ApiOperation({
    summary: 'Emitir un voto en una sala',
    description:
      'Registra el voto de un usuario en una sala de Planning Poker. El voto permanece oculto hasta que se revelen los votos.',
  })
  @ApiBody({
    type: VoteDto,
    description: 'Datos para emitir un voto',
  })
  @ApiResponse({
    status: 200,
    description: 'Voto registrado. Retorna el estado actualizado de la sala.',
    type: RoomResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Sala o usuario no encontrado' })
  vote(@Body() voteDto: VoteDto) {
    return this.roomsService.vote(voteDto.roomId, voteDto.userId, voteDto.vote);
  }

  @Post(':id/reset')
  @ApiOperation({
    summary: 'Reiniciar los votos de una sala',
    description:
      'Elimina todos los votos de una sala y permite que los usuarios vuelvan a votar.',
  })
  @ApiParam({ name: 'id', description: 'ID de la sala', example: 'room-123' })
  @ApiResponse({
    status: 200,
    description: 'Votos reiniciados. Retorna el estado actualizado de la sala.',
    type: RoomResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  resetVotes(@Param('id') roomId: string) {
    return this.roomsService.resetVotes(roomId);
  }

  @Post(':id/reveal')
  @ApiOperation({
    summary: 'Revelar los votos de una sala',
    description:
      'Revela todos los votos de los usuarios en una sala, mostrando los resultados.',
  })
  @ApiParam({ name: 'id', description: 'ID de la sala', example: 'room-123' })
  @ApiResponse({
    status: 200,
    description:
      'Votos revelados. Retorna el estado actualizado de la sala con showVotes: true.',
    type: RoomResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  revealVotes(@Param('id') roomId: string) {
    return this.roomsService.revealVotes(roomId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener información de una sala',
    description:
      'Retorna la información completa de una sala, incluyendo usuarios, votos y estado actual.',
  })
  @ApiParam({ name: 'id', description: 'ID de la sala', example: 'room-123' })
  @ApiResponse({
    status: 200,
    description: 'Información de la sala',
    type: RoomResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  getRoom(@Param('id') roomId: string) {
    return this.roomsService.getRoom(roomId);
  }

  @Delete(':roomId/users/:userId')
  @ApiOperation({
    summary: 'Eliminar un usuario de una sala',
    description:
      'Elimina a un usuario específico de una sala de Planning Poker.',
  })
  @ApiParam({
    name: 'roomId',
    description: 'ID de la sala',
    example: 'room-123',
  })
  @ApiParam({ name: 'userId', description: 'ID del usuario', example: '123' })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado. Retorna el estado actualizado de la sala.',
    type: RoomResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Sala no encontrada' })
  removeUser(@Param('roomId') roomId: string, @Param('userId') userId: number) {
    return this.roomsService.removeUser(roomId, userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una sala',
    description: 'Elimina completamente una sala y todos sus datos asociados.',
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
    return this.roomsService.removeRoom(roomId);
  }
}
