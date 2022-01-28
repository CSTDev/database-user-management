import { Role } from "./models";

export const getAllRoles = async (): Promise<Array<Role>> => {
  return [
    {
      roleId: "test.writer",
      shortName: "writer",
      description:
        "Allows user to perform write operations in the test database",
    },
    {
      roleId: "test.reader",
      shortName: "reader",
      description:
        "Allows user to perform read operations in the test database",
    },
    {
      roleId: "test.admin",
      shortName: "admin",
      description: "Allows user to perform all operations in the test database",
    },
    {
      roleId: "test.that",
      shortName: "that",
      description:
        "Allows user to perform that operations in the test database",
    },
    {
      roleId: "test.many",
      shortName: "many",
      description:
        "Allows user to perform many operations in the test database",
    },
  ];
};
