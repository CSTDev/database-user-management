package uk.co.cstdev.databasemanagement.repository;

import uk.co.cstdev.databasemanagement.model.MongoRole;
import uk.co.cstdev.databasemanagement.model.Role;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
@Mongo
public class MongoRoleRepository implements RoleRepository<MongoRole, String>{
}
