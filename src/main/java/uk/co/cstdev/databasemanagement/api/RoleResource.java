package uk.co.cstdev.databasemanagement.api;

import io.smallrye.common.annotation.NonBlocking;
import uk.co.cstdev.databasemanagement.model.Role;
import uk.co.cstdev.databasemanagement.service.RoleService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/role")
public class RoleResource {

    @Inject
    RoleService roleService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @NonBlocking
    public List<Role> getAll(){
        return roleService.getAllRoles();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @NonBlocking
    public Response createRole(Role role){
        Role createdRole = roleService.createRole(role);
        return Response.status(Response.Status.CREATED).entity(createdRole).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{roleId}")
    @NonBlocking
    public Response updateRole(@PathParam("roleId") String roleId, Role role){
        boolean updated = roleService.updateRole(roleId, role);
        if (updated){
            return Response.status(Response.Status.OK).build();
        }

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @DELETE
    @Path("/{roleId}")
    @NonBlocking
    public Response deleteRole(@PathParam("roleId") String roleId) {
        return roleService.deleteUser(roleId) ? Response.ok().build() : Response.serverError().build();
    }
}
