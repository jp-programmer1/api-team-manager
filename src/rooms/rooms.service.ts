import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  GitlabIssues,
  GitlabIteration,
  Room,
  User,
} from '../common/interfaces/room.interface';

@Injectable()
export class RoomsService {
  private rooms: Map<string, Room> = new Map();

  createRoom(
    name: string,
    { username, userId }: { username: string; userId: number },
  ): Room {
    const roomId = uuidv4();

    const user: User = {
      id: userId,
      username,
      hasVoted: false,
    };

    const room: Room = {
      id: roomId,
      name,
      users: [user],
      showVotes: false,
      ownerId: userId,
      createdAt: new Date(),
    };

    this.rooms.set(roomId, room);
    return room;
  }

  joinRoom(roomId: string, username: string, userId: number): Room {
    const room = this.rooms.get(roomId);

    if (!room) {
      throw new NotFoundException('Sala no encontrada');
    }

    const user: User = {
      id: userId,
      username,
      hasVoted: false,
    };

    room.users.push(user);

    return {
      ...room,
      userId,
    };
  }

  vote(roomId: string, userId: number, vote: string): Room {
    const room = this.rooms.get(roomId);

    if (!room) {
      throw new NotFoundException('Sala no encontrada');
    }

    const user = room.users.find((u) => u.id === userId);
    console.log(user);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado en la sala');
    }

    user.vote = vote;
    user.hasVoted = true;

    return room;
  }

  resetVotes(roomId: string): Room {
    const room = this.rooms.get(roomId);

    if (!room) {
      throw new NotFoundException('Sala no encontrada');
    }

    room.users.forEach((user) => {
      user.vote = undefined;
      user.hasVoted = false;
    });

    room.showVotes = false;
    return room;
  }

  revealVotes(roomId: string): Room {
    const room = this.rooms.get(roomId);

    if (!room) {
      throw new NotFoundException('Sala no encontrada');
    }

    room.showVotes = true;
    return room;
  }

  getRoom(roomId: string): Room {
    const room = this.rooms.get(roomId);

    console.log(room);

    if (!room) {
      throw new NotFoundException('Sala no encontrada');
    }

    return room;
  }

  removeUser(roomId: string, userId: number): Room {
    const room = this.rooms.get(roomId);

    if (!room) {
      throw new NotFoundException('Sala no encontrada');
    }

    room.users = room.users.filter((user) => user.id !== userId);

    // Si no quedan usuarios, eliminamos la sala
    if (room.users.length === 0) {
      this.rooms.delete(roomId);
    }

    return room;
  }

  informGitlab(
    roomId: string,
    {
      iteration,
      issues,
    }: { iteration: GitlabIteration; issues: GitlabIssues[] },
  ): Room {
    const room = this.rooms.get(roomId);

    if (!room) {
      throw new NotFoundException('Sala no encontrada');
    }

    room.informGitlab = {
      iteration,
      issues,
    };
    return room;
  }

  updateWeightIssues(roomId: string, weight: number, iid: number) {
    const room = this.rooms.get(roomId);

    if (!room || !room.informGitlab) {
      throw new NotFoundException('Sala no encontrada');
    }

    room.informGitlab.issues = room.informGitlab.issues.map((issue) => {
      if (issue.iid === iid) {
        issue.weight = weight;
      }
      return issue;
    });
    return room;
  }

  updateSelectedIssue(roomId: string, iid: number) {
    const room = this.rooms.get(roomId);

    if (!room || !room.informGitlab) {
      throw new NotFoundException('Sala no encontrada');
    }

    room.selectedIssueIid = iid;
    return room;
  }

  removeRoom(roomId: string) {
    this.rooms.delete(roomId);
  }
}
