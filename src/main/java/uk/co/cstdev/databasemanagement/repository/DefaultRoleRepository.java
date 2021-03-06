package uk.co.cstdev.databasemanagement.repository;

import uk.co.cstdev.databasemanagement.model.Role;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Default;

@ApplicationScoped
@Default
public class DefaultRoleRepository implements RoleRepository<Role, String>{
}
