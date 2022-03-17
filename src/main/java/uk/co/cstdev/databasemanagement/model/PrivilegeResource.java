package uk.co.cstdev.databasemanagement.model;

public class PrivilegeResource {
    private final String db;
    private final String collection;

    public PrivilegeResource(String db, String collection) {
        this.db = db;
        this.collection = collection;
    }

    public String getDb() {
        return db;
    }

    public String getCollection() {
        return collection;
    }
}
