package uk.co.cstdev.databasemanagement.model;

import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(database = "admin", collection = "system.roles")
public class MongoRole extends RoleBase {

    public MongoRole() {
    }

    public MongoRole(Role role) {
        super(role.roleId, role.roleName, role.privileges, role.roles);
    }
}
