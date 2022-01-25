import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import UserTable from "./UserTable";
import { User } from "../../data/models";

describe("User table", () => {
  const users: Array<User> = [
    {
      username: "bob",
      userId: "ABC123",
      roles: ["admin", "reader", "writer", "that", "many"],
    },
    { username: "jane", userId: "DEF234", roles: ["role", "another"] },
  ];

  it("renders the table title", () => {
    render(<UserTable users={[]} delete={jest.fn()} edit={jest.fn()} />);
    const title = screen.getByText("Users");
    expect(title).toBeInTheDocument();
  });

  it("renders each user row", () => {
    const rolesCount = 3;
    render(
      <UserTable
        users={users}
        delete={jest.fn()}
        edit={jest.fn()}
        roleOverflowLimit={rolesCount}
      />
    );
    users.forEach((u) => {
      const username = screen.getByText(u.username);
      const userId = screen.getByText(u.userId);
      expect(username).toBeInTheDocument();
      expect(userId).toBeInTheDocument();
      u.roles.slice(0, 3).forEach((r) => {
        const role = screen.getByText(r);
        expect(role).toBeInTheDocument();
      });

      if (u.roles.length - rolesCount > 0) {
        const overflowText = "+" + (u.roles.length - rolesCount) + "...";
        const overflowRole = screen.getByText(overflowText);
        expect(overflowRole).toBeInTheDocument();
      }
    });
  });

  it("can delete a user", () => {
    const deleteFunction = jest.fn();

    render(
      <UserTable users={users} delete={deleteFunction} edit={jest.fn()} />
    );
    users.forEach((u) => {
      const username = screen.getByText(u.username);
      const userId = screen.getByText(u.userId);
      expect(username).toBeInTheDocument();
      expect(userId).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    expect(deleteButtons.length).toBe(2);
    fireEvent.click(deleteButtons[0]);
    expect(deleteFunction).toBeCalledWith(users[0].userId);
  });

  it("enables editing", () => {
    const editFunction = jest.fn();

    render(<UserTable users={users} delete={jest.fn()} edit={editFunction} />);

    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    expect(editButtons.length).toBe(2);
    fireEvent.click(editButtons[0]);
    expect(editFunction).toBeCalledWith(users[0].userId);
  });
});
