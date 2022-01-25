export interface User {
  userId: string;
  username: string;
  roles: Array<string>;
}

export interface Role {
  name: string;
  shortName: string;
  description: string;
}
