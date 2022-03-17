package uk.co.cstdev.databasemanagement.api;

import com.mongodb.client.MongoClient;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uk.co.cstdev.databasemanagement.exceptions.CreateException;
import uk.co.cstdev.databasemanagement.model.MongoRole;
import uk.co.cstdev.databasemanagement.model.Role;
import uk.co.cstdev.databasemanagement.repository.Mongo;
import uk.co.cstdev.databasemanagement.repository.RoleRepository;
import uk.co.cstdev.databasemanagement.service.RoleService;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;

import java.util.Collections;

import static io.restassured.RestAssured.given;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@QuarkusTest
public class RoleResourceTest {

    @Inject
    RoleService roleService;

    @Inject
    RoleRepository<Role, String> roleRepository;

    @Inject
    @Mongo
    RoleRepository<MongoRole, String> mongoRoleRepository;

    @BeforeEach
    public void setup() {
        roleRepository.deleteAll();
        mongoRoleRepository.deleteAll();
    }

    @Test
    public void testGetAllRolesEndpoint() throws CreateException {
        Role role = new Role("admin.testRole", "testRole", "description", Collections.EMPTY_LIST, Collections.singletonList("reader"));
        roleService.createRole(role);

        Role[] roles = given()
                .when().get("/role")
                .then()
                .statusCode(200).extract().as(Role[].class);

        assertThat(roles.length, equalTo(1));
        assertThat(roles[0], equalTo(role));
    }

    @Test
    public void testRolesCanBeCreated() {
        final String roleId = "admin.testRole";
        Role role = new Role(roleId, "testRole", "description", Collections.EMPTY_LIST, Collections.singletonList("reader"));

        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(role)
                .when().post("/role")
                .then()
                .statusCode(201);

        Role foundRole = roleRepository.findById(roleId);
        assertThat(foundRole, notNullValue());

        MongoRole mongoRole = mongoRoleRepository.findById(roleId);
        assertThat(mongoRole, notNullValue());
    }

    @Test
    public void testRolesCanBeUpdated() throws CreateException {
        Role role = new Role("admin.testRole", "testRole", "description", Collections.EMPTY_LIST, Collections.singletonList("reader"));
        roleService.createRole(role);
        Role updatedRole = new Role("admin.testRole", "renamed", "description", Collections.EMPTY_LIST, Collections.singletonList("reader"));

        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(updatedRole)
                .when().put("/role/{roleId}", updatedRole.roleId)
                .then()
                .statusCode(200);

        Role foundRole = roleRepository.findById(updatedRole.roleId);
        assertThat(foundRole, notNullValue());
        assertThat(foundRole.roleName, equalTo(updatedRole.roleName));

        MongoRole foundMRole = mongoRoleRepository.findById(updatedRole.roleId);
        assertThat(foundMRole, notNullValue());
        assertThat(foundMRole.roleName, equalTo(updatedRole.roleName));
    }

    @Test
    public void testRolesCanBeDeleted() throws CreateException {
        Role role = new Role("admin.testRole", "testRole", "description", Collections.EMPTY_LIST, Collections.singletonList("reader"));
        roleService.createRole(role);

        given()
                .when().delete("/role/{roleId}", role.roleId)
                .then()
                .statusCode(200);

        Role foundRole = roleRepository.findById(role.roleId);
        assertThat(foundRole, nullValue());

        MongoRole foundMRole = mongoRoleRepository.findById(role.roleId);
        assertThat(foundMRole, nullValue());
    }
}
