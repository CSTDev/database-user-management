import React from "react";
import Home from "./Home";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { User } from "../../data/models";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../data/userAPI";

const users: Array<User> = [
  {
    username: "bob",
    userId: "ABC123",
    roles: ["admin", "reader", "writer", "that", "many"],
  },
  { username: "jane", userId: "DEF234", roles: ["role", "another"] },
];
jest.mock("../../data/userAPI");

const getAllUsersMock = getAllUsers as jest.MockedFunction<typeof getAllUsers>;
const createUserMock = createUser as jest.MockedFunction<typeof createUser>;
const updateUserMock = updateUser as jest.MockedFunction<typeof updateUser>;
const deleteUserMock = deleteUser as jest.MockedFunction<typeof deleteUser>;

beforeEach(() => {
  const apiUsers = Object.assign([] as Array<User>, users);
  getAllUsersMock.mockImplementation(async () => {
    return apiUsers;
  });

  createUserMock.mockImplementation(async (user: User) => {
    if (!user.roles) {
      user.roles = [];
    }
    apiUsers.push(user);
    return apiUsers;
  });

  updateUserMock.mockImplementation(async (user: User) => {
    const index = apiUsers.findIndex((u: User) => u.userId === user.userId);
    apiUsers[index] = user;
    return apiUsers;
  });

  deleteUserMock.mockImplementation(async (userId: string) => {
    return apiUsers.filter((u) => u.userId !== userId);
  });
});

describe("Home page", () => {
  it("renders the user table", async () => {
    render(<Home />);
    const title = await screen.findByText("Users");
    expect(title).toBeInTheDocument();
  });

  it("displays all users", async () => {
    render(<Home />);

    const loadingSpinner = screen.getByRole("progressbar", {
      name: /loading/i,
    });
    await waitForElementToBeRemoved(loadingSpinner);

    users.forEach((u) => {
      const username = screen.getByText(u.username);
      const userId = screen.getByText(u.userId);
      expect(username).toBeInTheDocument();
      expect(userId).toBeInTheDocument();
    });
  });

  it("deletes a user", async () => {
    render(<Home />);

    const loadingSpinner = screen.getByRole("progressbar", {
      name: /loading/i,
    });
    await waitForElementToBeRemoved(loadingSpinner);

    const username = screen.getByText(users[0].username);

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    expect(deleteButtons.length).toBe(2);
    fireEvent.click(deleteButtons[0]);

    // Confirm
    const confirmButton = await screen.findByRole("button", {
      name: /confirm delete/i,
    });
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);

    // Assert
    expect(username).not.toBeInTheDocument();
  });

  it("creates a user", async () => {
    render(<Home />);

    const loadingSpinner = screen.getByRole("progressbar", {
      name: /loading/i,
    });
    await waitForElementToBeRemoved(loadingSpinner);

    const addFab = screen.getByRole("button", { name: /createUser/i });
    fireEvent.click(addFab);

    const createUserPopover = await screen.findByText(/Create User/i);
    expect(createUserPopover).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("User Account"), {
      target: { value: "L123456" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "Mark" },
    });

    // Start typing role
    fireEvent.change(screen.getByLabelText("Role"), {
      target: { value: "tha" },
    });
    const newRole = await screen.findAllByText(/that/i);
    // Select the role
    fireEvent.click(newRole[1]);

    fireEvent.click(screen.getByText(/SUBMIT/i));

    await waitForElementToBeRemoved(createUserPopover);

    const newUserName = screen.getByText(/Mark/i);
    expect(newUserName).toBeInTheDocument();
    const roles = screen.getAllByText(/that/i);
    expect(roles).toHaveLength(2);
    const userId = screen.getByText(/L123456/i);
    expect(userId).toBeInTheDocument();
  });

  it("can edit a user", async () => {
    render(<Home />);

    const loadingSpinner = screen.getByRole("progressbar", {
      name: /loading/i,
    });
    await waitForElementToBeRemoved(loadingSpinner);

    const editUserButtons = screen.getAllByRole("button", { name: /edit/i });
    expect(editUserButtons.length).toBe(2);
    fireEvent.click(editUserButtons[0]);

    const createUserPopover = await screen.findByText(/Edit User/i);
    expect(createUserPopover).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "Billy" },
    });

    fireEvent.click(screen.getByText(/SUBMIT/i));

    await waitForElementToBeRemoved(createUserPopover);

    const newUserName = screen.getByText(/Billy/i);
    expect(newUserName).toBeInTheDocument();
  });

  it("can remove roles from a user", async () => {
    render(<Home />);

    const loadingSpinner = screen.getByRole("progressbar", {
      name: /loading/i,
    });
    await waitForElementToBeRemoved(loadingSpinner);

    const editUserButtons = screen.getAllByRole("button", { name: /edit/i });
    expect(editUserButtons.length).toBe(2);
    fireEvent.click(editUserButtons[0]);

    const createUserPopover = await screen.findByText(/Edit User/i);
    expect(createUserPopover).toBeInTheDocument();

    const adminRoles = screen.getAllByRole("button", { name: /admin/i });
    const roleToDelete = within(adminRoles[0]).getByLabelText("delete role");
    fireEvent.click(roleToDelete);
    fireEvent.click(screen.getByText(/SUBMIT/i));

    await waitForElementToBeRemoved(createUserPopover);

    const adminRoleChip = screen.queryByText(/admin/i);
    expect(adminRoleChip).toBeNull();
  });
});
