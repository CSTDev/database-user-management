package uk.co.cstdev.databasemanagement.model;

public class MongoUserRole {
    private String role;
    private String db;

    public MongoUserRole(String role, String db) {
        this.role = role;
        this.db = db;
    }

    public MongoUserRole() {
    }

    public String getRole() {
        return role;
    }

    public String getDb() {
        return db;
    }
}
