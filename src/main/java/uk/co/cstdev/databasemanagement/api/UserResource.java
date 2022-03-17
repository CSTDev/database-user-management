package uk.co.cstdev.databasemanagement.api;

import io.smallrye.common.annotation.NonBlocking;
import org.jboss.logging.Logger;
import uk.co.cstdev.databasemanagement.exceptions.CreateException;
import uk.co.cstdev.databasemanagement.exceptions.UpdateException;
import uk.co.cstdev.databasemanagement.model.User;
import uk.co.cstdev.databasemanagement.service.UserService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/user")
public class UserResource {

    private static final Logger LOG = Logger.getLogger(UserResource.class);

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
        try {
            User createdUser = userService.createUser(user);
            return Response.status(Response.Status.CREATED).entity(createdUser).build();
        } catch (CreateException e){
            LOG.errorv("failed to create user ID: %s, name: %s", user.userId, user.username);
            return Response.serverError().build();
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{userId}")
    @NonBlocking
    public Response updateUser(@PathParam("userId") String userId, User user){
        try {
            boolean updated = userService.updateUser(userId, user);
            if (updated){
                return Response.status(Response.Status.OK).build();
            }
            return Response.status(Response.Status.BAD_REQUEST).entity("no changes made").build();
        } catch (UpdateException e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DELETE
    @Path("/{userId}")
    @NonBlocking
    public Response deleteUser(@PathParam("userId") String userId){
        return userService.deleteUser(userId) ? Response.ok().build() : Response.serverError().build();
    }
}