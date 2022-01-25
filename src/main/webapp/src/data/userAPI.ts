import { User } from "./models";
const users = [
  {
    username: "bob",
    userId: "ABC123",
    roles: ["admin", "reader", "writer", "that", "many"],
  },
  { username: "jane", userId: "DEF234", roles: ["reader", "writer"] },
];

export const getAllUsers = async () => {
  return users;
};

export const createUser = async (user: User) => {
  if (!user.roles) {
    user.roles = [];
  }
  users.push(user);
};

export const updateUser = async (user: User) => {
  const index = users.findIndex((u) => u.userId === user.userId);
  users[index] = user;
};
