package uk.co.cstdev.databasemanagement.model;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;

import java.util.List;
import java.util.Objects;

public class RoleBase {
    @BsonId
    public String roleId;
    @BsonProperty("role")
    public String roleName;
    @BsonProperty("privileges")
    public List<Privilege> privileges;
    public List<String> roles;

    public RoleBase() {
    }

    public RoleBase(String roleId, String roleName, List<Privilege> privileges, List<String> roles) {
        this.roleId = roleId;
        this.roleName = roleName;
        this.privileges = privileges;
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RoleBase)) return false;
        RoleBase roleBase = (RoleBase) o;
        return Objects.equals(roleId, roleBase.roleId) && Objects.equals(roleName, roleBase.roleName) && Objects.equals(privileges, roleBase.privileges) && Objects.equals(roles, roleBase.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleId, roleName, privileges, roles);
    }
}
