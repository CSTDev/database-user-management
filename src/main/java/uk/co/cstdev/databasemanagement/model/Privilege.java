package uk.co.cstdev.databasemanagement.model;

import java.util.List;

public class Privilege {

    private final PrivilegeResource resource;
    private final List<String> actions;

    public Privilege(PrivilegeResource resource, List<String> actions) {
        this.resource = resource;
        this.actions = actions;
    }

    public PrivilegeResource getResource() {
        return resource;
    }

    public List<String> getActions() {
        return actions;
    }
}
