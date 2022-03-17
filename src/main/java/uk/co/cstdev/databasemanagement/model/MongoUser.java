package uk.co.cstdev.databasemanagement.model;

import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(database = "admin", collection = "system.users")
public class MongoUser extends User {
}
