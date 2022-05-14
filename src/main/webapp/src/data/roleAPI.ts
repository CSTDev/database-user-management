import { Role } from "./models";
import config from "../config";

const roles: Array<Role> = [];

const roleEndpoint = config.API_URL + "/role";

export const getAllRoles = async () => {
  const response = await fetch(roleEndpoint);
  const r = await response.json();
  roles.push(...r);
  return roles;
};

export const deleteRole = async (roleId: string) => {
  const requestOptions = {
    method: "DELETE",
  };

  return await fetch(roleEndpoint + "/" + roleId, requestOptions).then(
    (res) => {
      return roles.filter((r) => r.roleId !== roleId);
    }
  );
};

export const createRole = async (role: Role) => {
  role.roleId = role.roleName.replace(/\s/g, "");
  roles.push(role);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(role),
  };

  return await fetch(roleEndpoint, requestOptions).then(async (res) => {
    return roles;
  });
};

export const updateRole = async (role: Role) => {
  const index = roles.findIndex((r) => r.roleId === role.roleId);
  roles[index] = role;
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(role),
  };
  return await fetch(roleEndpoint + "/" + role.roleId, requestOptions).then(
    (res) => {
      return roles;
    }
  );
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
