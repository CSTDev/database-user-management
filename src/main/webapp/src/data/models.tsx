export interface User {
  userId: string;
  username: string;
  roles: Array<string>;
}

export interface Role {
  roleId: string;
  shortName: string;
  description: string;
}
