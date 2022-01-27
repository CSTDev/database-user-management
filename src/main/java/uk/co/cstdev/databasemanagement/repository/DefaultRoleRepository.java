package uk.co.cstdev.databasemanagement.repository;

import uk.co.cstdev.databasemanagement.model.Role;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DefaultRoleRepository implements RoleRepository<Role, String>{
}
