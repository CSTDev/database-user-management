package uk.co.cstdev.databasemanagement.model;

import io.quarkus.mongodb.panache.common.MongoEntity;

import java.util.List;
import java.util.Objects;

@MongoEntity(database="usermanagement", collection="roles")
public class Role extends RoleBase {

    public String description;

    public Role(){

    }

    public Role(String roleId, String roleName, String description, List<Privilege> privileges, List<String> roles){
        this.roleId = roleId;
        this.roleName = roleName;
        this.description = description;
        this.privileges = privileges;
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Role)) return false;
        Role role = (Role) o;
        return description.equals(role.description) && super.equals(role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(description);
    }
}
