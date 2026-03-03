export interface DiffUser {
  id: number;
  username: string;
}

export interface DiffRoom {
  id: string;
  nanoId: string;
  name?: string;
  users: DiffUser[];
  textOriginal?: string;
  textModified?: string;
  ownerId: number;
  createdAt: Date;
}
