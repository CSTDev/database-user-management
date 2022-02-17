import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Roles from "./Roles";
import { Role } from "../../data/models";
import {
  createRole,
  getAllRoles,
  getAvailableActions,
  updateRole,
} from "../../data/roleAPI";

jest.mock("../../data/roleAPI");

const getAllRolesMock = getAllRoles as jest.MockedFunction<typeof getAllRoles>;
const createRoleMock = createRole as jest.MockedFunction<typeof createRole>;
const updateRoleMock = updateRole as jest.MockedFunction<typeof updateRole>;
const getAvailableActionsMock = getAvailableActions as jest.MockedFunction<
  typeof getAvailableActions
>;

beforeEach(() => {
  const apiRoles = Object.assign([] as Array<Role>, roles);
  getAllRolesMock.mockImplementation(async () => {
    return apiRoles;
  });

  createRoleMock.mockImplementation(async (role: Role) => {
    role.roleId = role.shortName.replace(/\s/g, "");
    apiRoles.push(role);
    return apiRoles;
  });

  updateRoleMock.mockImplementation(async (role: Role) => {
    const index = apiRoles.findIndex((r) => r.roleId === role.roleId);
    apiRoles[index] = role;
    return apiRoles;
  });

  getAvailableActionsMock.mockImplementation(() => {
    return ["find"];
  });
});

describe("Roles page", () => {
  it("renders the roles table", async () => {
    render(<Roles />);
    const title = await screen.findByText("Roles");
    expect(title).toBeInTheDocument();
  });

  it("displays all roles", async () => {
    render(<Roles />);
    const loadingSpinner = screen.getByRole("progressbar", {
      name: /loading/i,
    });
    await waitForElementToBeRemoved(loadingSpinner);

    roles.forEach((r) => {
      const roleName = screen.getByText(r.shortName);
      expect(roleName).toBeInTheDocument();
      const roleDescription = screen.getByText(r.description);
      expect(roleDescription).toBeInTheDocument();
    });
  });

  it("deletes a role", async () => {
    render(<Roles />);
    const loadingSpinner = screen.getByRole("progressbar", {
      name: /loading/i,
    });
    await waitForElementToBeRemoved(loadingSpinner);

    const roleName = screen.getByText(roles[0].shortName);

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    expect(deleteButtons.length).toBe(roles.length);

    fireEvent.click(deleteButtons[0]);

    // Confirm
    const confirmButton = await screen.findByRole("button", {
      name: /confirm delete/i,
    });
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);

    //Assert
    expect(roleName).not.toBeInTheDocument();
  });

  it("creates a role", async () => {
    render(<Roles />);
    const loadingSpinner = screen.getByRole("progressbar", {
      name: /loading/i,
    });
    await waitForElementToBeRemoved(loadingSpinner);

    const addFab = screen.getByRole("button", { name: /createRole/i });
    fireEvent.click(addFab);

    const createRolePopoverTitle = await screen.findByText(/Create Role/i);
    expect(createRolePopoverTitle).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Role Name"), {
      target: { value: "Test Role" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "A role created during testing" },
    });
    fireEvent.click(screen.getByText(/SUBMIT/i));
    await waitForElementToBeRemoved(createRolePopoverTitle);

    const newRoleName = screen.getByText(/Test Role/i);
    expect(newRoleName).toBeInTheDocument();
    const newRoleDescription = screen.getByText(
      /A role created during testing/i
    );
    expect(newRoleDescription).toBeInTheDocument();
  });

  it("can edit a role", async () => {
    render(<Roles />);

    const loadingSpinner = screen.getByRole("progressbar", {
      name: /loading/i,
    });
    await waitForElementToBeRemoved(loadingSpinner);

    const editUserButtons = screen.getAllByRole("button", { name: /edit/i });
    expect(editUserButtons.length).toBe(roles.length);
    fireEvent.click(editUserButtons[0]);

    const createRolePopoverTitle = await screen.findByText(/Edit Role/i);
    expect(createRolePopoverTitle).toBeInTheDocument();

    const roleName = screen.getByText(/writer/i);
    expect(roleName).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Updated description" },
    });

    fireEvent.click(screen.getByText(/SUBMIT/i));
    await waitForElementToBeRemoved(createRolePopoverTitle);

    const newDescription = screen.getByText(/Updated description/i);
    expect(newDescription).toBeInTheDocument();
  });
});

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
