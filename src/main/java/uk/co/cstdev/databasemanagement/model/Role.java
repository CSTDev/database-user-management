package uk.co.cstdev.databasemanagement.model;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.codecs.pojo.annotations.BsonId;

import java.util.Objects;

@MongoEntity(database="usermanagement", collection="roles")
public class Role {

    @BsonId
    public String roleId;
    public String roleName;

    public Role(){

    }

    public Role(String roleId, String roleName){
        this.roleId = roleId;
        this.roleName = roleName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Role)) return false;
        Role role = (Role) o;
        return roleId.equals(role.roleId) && roleName.equals(role.roleName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleId, roleName);
    }
}
