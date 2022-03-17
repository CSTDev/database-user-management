package uk.co.cstdev.databasemanagement.service;

import com.mongodb.MongoWriteException;
import com.mongodb.ServerAddress;
import com.mongodb.WriteError;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.mockito.InjectMock;
import org.bson.BsonDocument;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import uk.co.cstdev.databasemanagement.exceptions.CreateException;
import uk.co.cstdev.databasemanagement.exceptions.UpdateException;
import uk.co.cstdev.databasemanagement.model.MongoRole;
import uk.co.cstdev.databasemanagement.model.Role;
import uk.co.cstdev.databasemanagement.repository.RoleRepository;

import javax.inject.Inject;
import java.util.Collections;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@QuarkusTest
public class DefaultRoleServiceTest {

    @InjectMock
    RoleRepository<Role, String> mockRoleRepostory;

    @InjectMock
    RoleRepository<MongoRole, String> mockMongoRoleRepository;

    @Inject
    RoleService roleService;


    @Test
    public void whenAdminRoleCreationFailsTheUsermanagementRoleIsDeleted() {

        Role role = new Role("admin.testRole", "testRole", "description", Collections.EMPTY_LIST, Collections.singletonList("reader"));
        MongoRole mRole = new MongoRole(role);
        Mockito.doThrow(new MongoWriteException(new WriteError(1, "exists", BsonDocument.parse("{}")), new ServerAddress())).when(mockMongoRoleRepository).persist(mRole);
        Assertions.assertThrows(CreateException.class, () -> this.roleService.createRole(role));
        verify(mockRoleRepostory, times(1)).deleteById(role.roleId);
    }

    @Test
    public void whenAdminRoleUpdateFailsTheUsermanagementRoleIsRolledBack() {
        Role role = new Role("admin.testRole", "testRole", "description", Collections.EMPTY_LIST, Collections.singletonList("reader"));
        Role updatedRole = new Role("admin.testRole", "renamed", "description", Collections.EMPTY_LIST, Collections.singletonList("reader"));

        Mockito.when(mockRoleRepostory.findById(updatedRole.roleId)).thenReturn(role);
        MongoRole mRole = new MongoRole(updatedRole);
        Mockito.doThrow(new MongoWriteException(new WriteError(1, "exists", BsonDocument.parse("{}")), new ServerAddress())).when(mockMongoRoleRepository).update(mRole);
        Assertions.assertThrows(UpdateException.class, () -> this.roleService.updateRole(updatedRole.roleId, updatedRole));
        verify(mockRoleRepostory, times(1)).update(updatedRole);
        verify(mockRoleRepostory, times(1)).update(role);
    }
}
