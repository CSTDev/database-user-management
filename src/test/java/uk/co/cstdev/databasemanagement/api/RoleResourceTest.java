package uk.co.cstdev.databasemanagement.api;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import uk.co.cstdev.databasemanagement.model.Role;
import uk.co.cstdev.databasemanagement.repository.RoleRepository;
import uk.co.cstdev.databasemanagement.service.RoleService;

import javax.inject.Inject;
import javax.ws.rs.core.MediaType;

import static io.restassured.RestAssured.given;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@QuarkusTest
public class RoleResourceTest {

    @Inject
    RoleService roleService;

    @Inject
    RoleRepository<Role, String> roleRepository;

    @BeforeEach
    public void setup(){
        roleRepository.deleteAll();
    }

    @Test
    public void testGetAllRolesEndpoint() {
        Role role = new Role("admin.testRole", "testRole");
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
        Role role = new Role(roleId, "testRole");

        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(role)
                .when().post("/role")
                .then()
                .statusCode(201);

        Role foundRole = roleRepository.findById(roleId);
        assertThat(foundRole, notNullValue());
    }

    @Test
    public void testRolesCanBeUpdated(){
        Role role = new Role("admin.testRole", "testRole");
        roleService.createRole(role);
        Role updatedRole = new Role("admin.testRole","renamed");

        given()
                .contentType(MediaType.APPLICATION_JSON)
                .body(updatedRole)
                .when().put("/role/{roleId}", updatedRole.roleId)
                .then()
                .statusCode(200);

        Role foundRole = roleRepository.findById(updatedRole.roleId);
        assertThat(foundRole, notNullValue());
        assertThat(foundRole.roleName, equalTo(updatedRole.roleName));
    }

    @Test
    public void testRolesCanBeDeleted(){
        Role role = new Role("admin.testRole", "testRole");
        roleService.createRole(role);

        given()
                .when().delete("/role/{roleId}", role.roleId)
                .then()
                .statusCode(200);

        Role foundRole = roleRepository.findById(role.roleId);
        assertThat(foundRole, nullValue());
    }
}
