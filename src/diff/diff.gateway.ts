import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { DiffRoomsService } from './diff-rooms.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  namespace: 'diff',
})
export class DiffGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('DiffGateway');

  constructor(private readonly diffRooms: DiffRoomsService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Diff client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Diff client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinDiffRoom')
  handleJoinDiffRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId?: string;
      nanoId?: string;
      name?: string;
      username: string;
      userId: number;
    },
  ) {
    try {
      const room = this.diffRooms.joinOrCreate({
        roomId: data.roomId,
        nanoId: data.nanoId,
        name: data.name,
        username: data.username,
        userId: data.userId,
      });

      void client.join(room.id);

      // Send full room state to the requester
      client.emit('diffRoom', {
        id: room.id,
        nanoId: room.nanoId,
        name: room.name,
        users: room.users,
        textOriginal: room.textOriginal ?? '',
        textModified: room.textModified ?? '',
      });

      // Notify others about current users
      this.server.to(room.id).emit('diffUsers', room.users);
    } catch (error) {
      this.logger.error('Error joining/creating diff room:', error);
      client.emit('error', { message: 'Error joining/creating diff room' });
    }
  }

  @SubscribeMessage('setText')
  handleSetText(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId?: string;
      nanoId?: string;
      text: string;
      type: 'original' | 'modified';
    },
  ) {
    try {
      const room = this.diffRooms.setText({
        roomId: data.roomId,
        nanoId: data.nanoId,
        text: data.text,
        type: data.type,
      });

      this.server.to(room.id).emit('textUpdated', {
        roomId: room.id,
        type: data.type,
        textOriginal: room.textOriginal,
        textModified: room.textModified,
      });
    } catch (error) {
      this.logger.error('Error setting text in diff room:', error);
      client.emit('error', { message: 'Error setting text in diff room' });
    }
  }

  @SubscribeMessage('removeUser')
  async handleRemoveUser(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId: string;
      userId: number;
    },
  ) {
    try {
      const updatedRoom = this.diffRooms.removeUser(data.roomId, data.userId);

      // Notificar a todos en la sala que el usuario fue eliminado
      this.server.to(data.roomId).emit('userRemoved', {
        roomId: data.roomId,
        userId: data.userId,
        users: updatedRoom.users,
        roomDeleted: updatedRoom.users.length === 0,
      });

      // Si la sala fue eliminada, notificar y desconectar a todos
      if (updatedRoom.users.length === 0) {
        this.server.to(data.roomId).emit('roomDeleted', {
          roomId: data.roomId,
          message: 'La sala ha sido eliminada',
        });

        // Desconectar a todos los clientes de la sala
        const sockets = await this.server.in(data.roomId).fetchSockets();
        sockets.forEach((socket) => {
          void socket.leave(data.roomId);
        });
      } else {
        // Enviar estado actualizado de la sala
        this.server.to(data.roomId).emit('diffRoom', {
          id: updatedRoom.id,
          nanoId: updatedRoom.nanoId,
          name: updatedRoom.name,
          users: updatedRoom.users,
        });
      }

      client.emit('userRemovedSuccess', {
        success: true,
        message: 'Usuario eliminado de la sala',
        roomId: data.roomId,
        userId: data.userId,
      });
    } catch (error: unknown) {
      this.logger.error('Error removing user from diff room:', error);
      client.emit('error', { message: (error as Error).message });
    }
  }

  @SubscribeMessage('removeRoom')
  async handleRemoveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId: string;
    },
  ) {
    try {
      this.diffRooms.removeRoom(data.roomId);

      // Notificar a todos en la sala que fue eliminada
      this.server.to(data.roomId).emit('roomDeleted', {
        roomId: data.roomId,
        message: 'La sala ha sido eliminada',
      });

      client.emit('roomRemovedSuccess', {
        success: true,
        message: 'Sala eliminada',
        roomId: data.roomId,
      });

      // Desconectar a todos los clientes de la sala
      const sockets = await this.server.in(data.roomId).fetchSockets();
      sockets.forEach((socket) => {
        void socket.leave(data.roomId);
      });
    } catch (error: unknown) {
      this.logger.error('Error removing diff room:', error);
      client.emit('error', { message: (error as Error).message });
    }
  }
}
