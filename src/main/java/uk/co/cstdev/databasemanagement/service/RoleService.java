package uk.co.cstdev.databasemanagement.service;

import uk.co.cstdev.databasemanagement.model.Role;

import java.util.List;

public interface RoleService {

    List<Role> getAllRoles();

    Role createRole(Role role);

    boolean updateRole(String roleId, Role role);

    boolean deleteUser(String roleId);
}
