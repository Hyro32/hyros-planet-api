export interface Player {
  uuid: string;
  locale: string;
  rank: string;
  first_joined: Date;
  last_joined: Date;
}

export interface Sanction {
  target_uuid: string;
  agent_uuid?: string;
  type: string;
  reason: string;
  created_at: Date;
  expires_at?: Date;
}

export interface User {
  email: string;
  password: string;
  uuid: string;
}
