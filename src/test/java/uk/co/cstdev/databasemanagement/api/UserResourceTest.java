package uk.co.cstdev.databasemanagement.api;

import com.mongodb.assertions.Assertions;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uk.co.cstdev.databasemanagement.exceptions.CreateException;
import uk.co.cstdev.databasemanagement.model.MongoUser;
import uk.co.cstdev.databasemanagement.model.User;
import uk.co.cstdev.databasemanagement.repository.UserRepository;
import uk.co.cstdev.databasemanagement.service.UserService;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;
import java.util.Collections;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.hasItem;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

@QuarkusTest
public class UserResourceTest {

    @Inject
    UserRepository<User, String> userRepository;

    @Inject
    UserRepository<MongoUser, String> mongoUserRepository;

    @Inject
    UserService userService;

    @BeforeEach
    public void setup(){
        userRepository.deleteAll();
        mongoUserRepository.deleteAll();
    }

    @Test
    public void testGetAllUsersEndpoint() throws CreateException {
        User user = new User("ABC123", "ABC123");
        userService.createUser(user);

       User[] users = given()
          .when().get("/user")
          .then()
             .statusCode(200).extract().as(User[].class);

        assertThat(users.length, equalTo(1));
        assertThat(users[0], equalTo(user));
    }

    @Test
    public void testUsersCanBeCreated(){
        final String userId = "ABC123";
        User user = new User(userId, userId);
        user.roles = Collections.singletonList("reader");

        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(user)
                .when().post("/user")
                .then()
                .statusCode(201);

        User foundUser = userRepository.findById(user.userId);
        Assertions.assertNotNull(foundUser);
        assertThat(foundUser.roles, hasItem("reader"));

        MongoUser mongoUser = mongoUserRepository.findById(user.userId);
        Assertions.assertNotNull(mongoUser);

    }

    @Test
    public void testUsersCanBeUpdated() throws CreateException {
        User user = new User("ABC123", "ABC123");
        userService.createUser(user);
        User updateUser = new User("ABC123","BCD234");

        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(updateUser)
                .when().put("/user/{userId}", updateUser.userId)
                .then()
                .statusCode(200);

        User foundUser = userRepository.findById(user.userId);
        Assertions.assertNotNull(foundUser);
        assertThat(foundUser.username, equalTo(updateUser.username));

        MongoUser mongoUser = mongoUserRepository.findById(updateUser.userId);
        assertThat(mongoUser, notNullValue());
        assertThat(mongoUser.username, equalTo(updateUser.username));
    }

    @Test
    public void testUsersCanBeDeleted() throws CreateException {
        User user = new User("ABC123", "ABC123");
        userService.createUser(user);

        given()
                .when().delete("/user/{userId}", user.userId)
                .then()
                .statusCode(200);

        User foundUser = userRepository.findById(user.userId);
        assertThat(foundUser, nullValue());

        MongoUser foundMUser = mongoUserRepository.findById(user.userId);
        assertThat(foundMUser, nullValue());
    }

}