package uk.co.cstdev.databasemanagement.model;

import org.bson.codecs.pojo.annotations.BsonProperty;

import java.util.List;

public class Privilege {

    @BsonProperty("resource")
    public PrivilegeResource resource;
    public List<String> actions;
    @BsonProperty("id")
    public Long id;

    public Privilege() {
    }

    public Privilege(Long id, PrivilegeResource resource, List<String> actions) {
        this.resource = resource;
        this.actions = actions;
        this.id = id;
    }

    public PrivilegeResource getResource() {
        return resource;
    }

    public List<String> getActions() {
        return actions;
    }

    public Long getId() {
        return id;
    }
}
