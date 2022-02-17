import { Role } from "./models";
const roles: Array<Role> = [
  {
    roleId: "test.writer",
    shortName: "writer",
    description: "Allows user to perform write operations in the test database",
    privileges: [],
  },
  {
    roleId: "test.reader",
    shortName: "reader",
    description: "Allows user to perform read operations in the test database",
    privileges: [],
  },
  {
    roleId: "test.admin",
    shortName: "admin",
    description: "Allows user to perform all operations in the test database",
    privileges: [],
  },
  {
    roleId: "test.that",
    shortName: "that",
    description: "Allows user to perform that operations in the test database",
    privileges: [],
  },
  {
    roleId: "test.many",
    shortName: "many",
    description: "Allows user to perform many operations in the test database",
    privileges: [],
  },
];

export const getAllRoles = async (): Promise<Array<Role>> => {
  return roles;
};

export const deleteRole = async (roleId: string) => {};

export const createRole = async (role: Role) => {
  role.roleId = role.shortName.replace(/\s/g, "");
  roles.push(role);
  return roles;
};

export const updateRole = async (role: Role) => {
  const index = roles.findIndex((r) => r.roleId === role.roleId);
  roles[index] = role;
  return roles;
};

export const getAvailableActions = () => {
  return [
    "find",
    "insert",
    "remove",
    "update",
    "useUUID",
    "bypassDocumentValidation",
    "changeOwnPassword",
    "createCollection",
    "createIndex",
    "createRole",
    "createUser",
    "dropCollection",
    "dropRole",
    "dropUser",
    "grantRole",
    "revokeRole",
  ];
};
