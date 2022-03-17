package uk.co.cstdev.databasemanagement.api;

import io.smallrye.common.annotation.NonBlocking;
import org.jboss.logging.Logger;
import uk.co.cstdev.databasemanagement.exceptions.CreateException;
import uk.co.cstdev.databasemanagement.exceptions.UpdateException;
import uk.co.cstdev.databasemanagement.model.Role;
import uk.co.cstdev.databasemanagement.service.RoleService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/role")
public class RoleResource {

    private static final Logger LOG = Logger.getLogger(RoleResource.class);

    @Inject
    RoleService roleService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @NonBlocking
    public List<Role> getAll() {
        return roleService.getAllRoles();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @NonBlocking
    public Response createRole(Role role) {
        try {
            Role createdRole = roleService.createRole(role);
            return Response.status(Response.Status.CREATED).entity(createdRole).build();
        } catch (CreateException e) {
            LOG.errorv("failed to create role ID: %s, name: %s", role.roleId, role.roleName);
            return Response.serverError().build();
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{roleId}")
    @NonBlocking
    public Response updateRole(@PathParam("roleId") String roleId, Role role) {
        try {
            boolean updated = roleService.updateRole(roleId, role);
            if (updated) {
                return Response.status(Response.Status.OK).build();
            }
            return Response.status(Response.Status.BAD_REQUEST).entity("no changes made").build();
        } catch (UpdateException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DELETE
    @Path("/{roleId}")
    @NonBlocking
    public Response deleteRole(@PathParam("roleId") String roleId) {
        return roleService.deleteRole(roleId) ? Response.ok().build() : Response.serverError().build();
    }
}
