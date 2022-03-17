package uk.co.cstdev.databasemanagement.model;

import org.bson.codecs.pojo.annotations.BsonId;

import java.util.List;
import java.util.Objects;

public class UserBase {

    public UserBase() {
    }

    public UserBase(String userId, String username) {
        this.userId = userId;
        this.username = username;
    }

    @BsonId
    public String userId;
    public String username;
    public List<String> roles;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserBase)) return false;
        UserBase userBase = (UserBase) o;
        return Objects.equals(userId, userBase.userId) && Objects.equals(username, userBase.username) && Objects.equals(roles, userBase.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, username, roles);
    }
}
