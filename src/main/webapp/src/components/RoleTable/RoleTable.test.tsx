import React from "react";
import { render, screen } from "@testing-library/react";
import RoleTable from "./RoleTable";
import { Role } from "../../data/models";

describe("Role table", () => {
  const roles: Array<Role> = [
    {
      roleId: "test.writer",
      shortName: "writer",
      description:
        "Allows user to perform write operations in the test database",
    },
  ];

  it("renders the table title", () => {
    render(<RoleTable roles={roles} delete={jest.fn()} edit={jest.fn()} />);
    const title = screen.getByText("Roles");
    expect(title).toBeInTheDocument();
  });

  it("renders each role row", () => {
    render(<RoleTable roles={roles} delete={jest.fn()} edit={jest.fn()} />);

    roles.forEach((r) => {
      const shortName = screen.getByText(r.shortName);
      const description = screen.getByText(r.description);
      expect(shortName).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });
});
