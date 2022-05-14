package uk.co.cstdev.databasemanagement.model;

import io.quarkus.mongodb.panache.common.MongoEntity;
import org.bson.codecs.pojo.annotations.BsonProperty;

import java.util.List;

@MongoEntity(database = "admin", collection = "system.users")
public class MongoUser extends UserBase {

    @BsonProperty("db")
    public String database;
    @BsonProperty("roles")
    public List<MongoUserRole> userRoles;

    public MongoUser() {
    }

    public MongoUser(User user, String password) {
        super(user.userId, user.username);
        if(password != null) {
            this.password = password;
        }
        this.roles = user.roles;
        this.database = "admin";
    }
}
