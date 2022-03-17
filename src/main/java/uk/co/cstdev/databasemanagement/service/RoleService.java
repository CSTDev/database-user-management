package uk.co.cstdev.databasemanagement.service;

import uk.co.cstdev.databasemanagement.exceptions.CreateException;
import uk.co.cstdev.databasemanagement.exceptions.UpdateException;
import uk.co.cstdev.databasemanagement.model.Role;

import java.util.List;

public interface RoleService {

    List<Role> getAllRoles();

    Role createRole(Role role) throws CreateException;

    boolean updateRole(String roleId, Role role) throws UpdateException;

    boolean deleteRole(String roleId);
}
