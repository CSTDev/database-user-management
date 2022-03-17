package uk.co.cstdev.databasemanagement.model;

import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(database="usermanagement", collection="users")
public class User extends UserBase {
    public User() {
    }

    public User(String userId, String username) {
        super(userId, username);
    }
}
