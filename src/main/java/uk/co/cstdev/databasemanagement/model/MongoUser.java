package uk.co.cstdev.databasemanagement.model;

import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(database = "admin", collection = "system.users")
public class MongoUser extends UserBase {

    public MongoUser() {
    }

    public MongoUser(User user) {
        super(user.userId, user.username);
    }
}
