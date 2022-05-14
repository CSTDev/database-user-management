import { User } from "./models";
import config from "../config";

const users: Array<User> = [];

const userEndpoint = config.API_URL + "/user";

export const getAllUsers = async () => {
  const response = await fetch(userEndpoint);
  const u = await response.json();
  users.push(...u);
  return users;
};

export const createUser = async (user: User) => {
  if (!user.roles) {
    user.roles = [];
  }
  users.push(user);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
  return await fetch(userEndpoint, requestOptions).then((res) => {
    return res.json();
  });
};

export const updateUser = async (user: User) => {
  const index = users.findIndex((u) => u.userId === user.userId);
  users[index] = user;
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
  return await fetch(userEndpoint + "/" + user.userId, requestOptions).then(
    (res) => {
      return users;
    }
  );
};

export const deleteUser = async (userId: string) => {
  const requestOptions = {
    method: "DELETE",
  };
  return await fetch(userEndpoint + "/" + userId, requestOptions).then(
    (res) => {
      return users.filter((u) => u.userId !== userId);
    }
  );
};
