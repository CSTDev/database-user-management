export interface User {
  userId: string;
  username: string;
  roles: Array<string>;
  password?: string;
}

export interface Role {
  roleId: string;
  roleName: string;
  description: string;
  privileges: Array<Privilege>;
}

export interface Privilege {
  id: number;
  resource: PrivilegeResource;
  actions: Array<string>;
}

export interface PrivilegeResource {
  db: string;
  collection: string;
}
