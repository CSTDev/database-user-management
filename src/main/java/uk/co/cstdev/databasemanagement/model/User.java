package uk.co.cstdev.databasemanagement.model;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.codecs.pojo.annotations.BsonId;

import java.util.Objects;

@MongoEntity(database="usermanagement", collection="users")
public class User {

    public User() {
    }

    public User(String userId, String username) {
        this.userId = userId;
        this.username = username;
    }

    @BsonId
    public String userId;
    public String username;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return Objects.equals(userId, user.userId) && Objects.equals(username, user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, username);
    }
}
