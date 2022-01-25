export const getAllRoles = async () => {
  return [
    {
      name: "test.writer",
      shortName: "writer",
      description:
        "Allows user to perform write operations in the test database",
    },
    {
      name: "test.reader",
      shortName: "reader",
      description:
        "Allows user to perform read operations in the test database",
    },
    {
      name: "test.admin",
      shortName: "admin",
      description: "Allows user to perform all operations in the test database",
    },
    {
      name: "test.that",
      shortName: "that",
      description:
        "Allows user to perform that operations in the test database",
    },
    {
      name: "test.many",
      shortName: "many",
      description:
        "Allows user to perform many operations in the test database",
    },
  ];
};
