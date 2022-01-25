package uk.co.cstdev.databasemanagement.api;

import io.smallrye.common.annotation.NonBlocking;
import uk.co.cstdev.databasemanagement.model.User;
import uk.co.cstdev.databasemanagement.service.UserService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/user")
public class UserResource {

    @Inject
    UserService userService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @NonBlocking
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @NonBlocking
    public Response createUser(User user){
        User createdUser = userService.createUser(user);
        return Response.status(Response.Status.CREATED).entity(createdUser).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{userId}")
    @NonBlocking
    public Response updateUser(@PathParam("userId") String userId, User user){
        boolean updated = userService.updateUser(userId, user);
        if (updated){
            return Response.status(Response.Status.OK).build();
        }

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @DELETE
    @Path("/{userId}")
    @NonBlocking
    public Response deleteUser(@PathParam("userId") String userId){
        return userService.deleteUser(userId) ? Response.ok().build() : Response.serverError().build();
    }
}