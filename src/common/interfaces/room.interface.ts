export interface User {
  id: number;
  username: string;
  vote?: string;
  hasVoted: boolean;
}

export interface Room {
  id: string;
  name: string;
  ownerId: number;
  users: User[];
  showVotes: boolean;
  userId?: number;
  createdAt: Date;
  informGitlab?: {
    iteration: GitlabIteration;
    issues: GitlabIssues[];
  };
}

export interface GitlabIteration {
  id: string;
  iid: number;
  title: string | null;
  description: string | null;
  start_date: string;
  due_date: string;
  state: number;
  web_url: string;
  group_id: number;
  created_at: string;
  updated_at: string;
}

export interface GitlabIssues {
  weight: number;
  title: string;
  iid: number;
  web_url: string;
  description: string | null;
  project_id: number;
  created_at: string;
  updated_at: string;
}
