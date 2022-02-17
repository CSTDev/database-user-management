export interface User {
  userId: string;
  username: string;
  roles: Array<string>;
}

export interface Role {
  roleId: string;
  shortName: string;
  description: string;
  privileges: Array<Privilege>;
}

export interface Privilege {
  id: number;
  database: string;
  collection: string;
  actions: Array<string>;
}
