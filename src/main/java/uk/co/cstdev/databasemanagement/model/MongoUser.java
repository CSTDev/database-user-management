package uk.co.cstdev.databasemanagement.model;

import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(database = "admin", collection = "system.users")
public class MongoUser extends UserBase {

    public MongoUser() {
    }

    public MongoUser(User user, String password) {
        super(user.userId, user.username);
        if(password != null) {
            this.password = password;
        }
        this.roles = user.roles;
    }
}
