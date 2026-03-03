import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DiffRoom, DiffUser } from '../common/interfaces/diff-room.interface';

@Injectable()
export class DiffRoomsService {
  private rooms: Map<string, DiffRoom> = new Map();

  private findRoomBy(roomId?: string, nanoId?: string): DiffRoom | undefined {
    if (roomId && this.rooms.has(roomId)) return this.rooms.get(roomId);
    if (!nanoId) return undefined;
    for (const [, value] of this.rooms) {
      if (value.nanoId === nanoId) return value;
    }
    return undefined;
  }

  joinOrCreate(params: {
    roomId?: string;
    nanoId?: string;
    name?: string;
    username: string;
    userId: number;
  }): DiffRoom {
    const { roomId, nanoId, name, username, userId } = params;

    let room = this.findRoomBy(roomId, nanoId);

    if (!room) {
      const newId = uuidv4();
      const newNano =
        nanoId && nanoId.length > 0 ? nanoId : uuidv4().substring(0, 5);

      const user: DiffUser = { id: userId, username };
      room = {
        id: newId,
        nanoId: newNano,
        name: name ?? 'Diff Room',
        users: [user],
        textOriginal: '',
        ownerId: userId,
        createdAt: new Date(),
      };
      this.rooms.set(newId, room);
      return room;
    }

    if (!room.users.find((u) => u.id === userId)) {
      room.users.push({ id: userId, username });
    }

    return room;
  }

  setText(params: {
    roomId?: string;
    nanoId?: string;
    text: string;
    type: 'original' | 'modified';
  }): DiffRoom {
    const room = this.findRoomBy(params.roomId, params.nanoId);
    if (!room) {
      throw new Error('Sala no encontrada');
    }
    if (params.type === 'original') {
      room.textOriginal = params.text;
    }
    if (params.type === 'modified') {
      room.textModified = params.text;
    }
    return room;
  }

  getRoom(roomId: string): DiffRoom {
    const room = this.rooms.get(roomId);
    if (!room) {
      throw new Error('Sala no encontrada');
    }
    return room;
  }

  removeRoom(roomId: string): void {
    const room = this.rooms.get(roomId);
    if (!room) {
      throw new Error('Sala no encontrada');
    }
    this.rooms.delete(roomId);
  }

  removeUser(roomId: string, userId: number): DiffRoom {
    const room = this.rooms.get(roomId);
    if (!room) {
      throw new Error('Sala no encontrada');
    }

    const userIndex = room.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      throw new Error('Usuario no encontrado en la sala');
    }

    room.users.splice(userIndex, 1);

    // Si no quedan usuarios, eliminar la sala
    if (room.users.length === 0) {
      this.rooms.delete(roomId);
      return room;
    }

    return room;
  }
}
