package uk.co.cstdev.databasemanagement.service;

import uk.co.cstdev.databasemanagement.model.Role;
import uk.co.cstdev.databasemanagement.repository.RoleRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class DefaultRoleService implements RoleService{

    @Inject
    RoleRepository<Role, String> roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll().list();
    }

    @Override
    public Role createRole(Role role) {
        roleRepository.persist(role);
        return role;
    }

    @Override
    public boolean updateRole(String roleId, Role role) {
        roleRepository.update(role);
        return true;
    }

    @Override
    public boolean deleteUser(String roleId) {
        return roleRepository.deleteById(roleId);
    }
}
