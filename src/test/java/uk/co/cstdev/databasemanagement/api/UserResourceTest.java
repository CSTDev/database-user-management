package uk.co.cstdev.databasemanagement.api;

import com.mongodb.assertions.Assertions;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uk.co.cstdev.databasemanagement.model.User;
import uk.co.cstdev.databasemanagement.repository.UserRepository;
import uk.co.cstdev.databasemanagement.service.UserService;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;

import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@QuarkusTest
public class UserResourceTest {

    @Inject
    UserRepository<User, String> userRepository;

    @Inject
    UserService userService;

    @BeforeEach
    public void setup(){
        userRepository.deleteAll();
    }

    @Test
    public void testGetAllUsersEndpoint() {
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

        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(user)
                .when().post("/user")
                .then()
                .statusCode(201);

        User foundUser = userRepository.findById(user.userId);
        Assertions.assertNotNull(foundUser);
    }

    @Test
    public void testUsersCanBeUpdated(){
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
    }

    @Test
    public void testUsersCanBeDeleted(){
        User user = new User("ABC123", "ABC123");
        userService.createUser(user);

        given()
                .when().delete("/user/{userId}", user.userId)
                .then()
                .statusCode(200);

        User foundUser = userRepository.findById(user.userId);
        Assertions.assertNull(foundUser);
    }

}