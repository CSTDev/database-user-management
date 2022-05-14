package uk.co.cstdev.databasemanagement.model;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PrivilegeResource {
    public String db;
    public String collection;

    public PrivilegeResource(String db, String collection) {
        this.db = db;
        this.collection = collection;
    }

    public PrivilegeResource() {
    }

    public String getDb() {
        return db;
    }

    public String getCollection() {
        return collection;
    }
}
