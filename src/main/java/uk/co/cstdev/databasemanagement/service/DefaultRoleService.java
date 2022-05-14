package uk.co.cstdev.databasemanagement.service;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoWriteException;
import org.jboss.logging.Logger;
import uk.co.cstdev.databasemanagement.exceptions.CreateException;
import uk.co.cstdev.databasemanagement.exceptions.UpdateException;
import uk.co.cstdev.databasemanagement.model.MongoRole;
import uk.co.cstdev.databasemanagement.model.Role;
import uk.co.cstdev.databasemanagement.repository.Mongo;
import uk.co.cstdev.databasemanagement.repository.RoleRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Collections;
import java.util.List;
@ApplicationScoped
public class DefaultRoleService implements RoleService {

    private static final Logger LOG = Logger.getLogger(DefaultRoleService.class);

    @Inject
    RoleRepository<Role, String> roleRepository;

    @Inject
    @Mongo
    RoleRepository<MongoRole, String> mongoRoleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll().list();
    }

    @Override
    public Role createRole(Role role) throws CreateException {
        try {
            roleRepository.persist(role);
        } catch (MongoWriteException e) {
            throw new CreateException("failed to create role in database", e);
        }

        try{
            // TODO  move into repository?
            mongoRoleRepository.mongoDatabase().runCommand(new BasicDBObject()
                    .append("createRole", role.roleName)
                    .append("roles", Collections.emptyList())
                    .append("privileges", role.privileges))
                    ;
        }catch (MongoWriteException e) {
            if (!roleRepository.deleteById(role.roleId)){
                LOG.warnv("failed when rolling back role creation, roleID: %s", role.roleId);
            }
            throw new CreateException("failed to create role in admin database", e);
        }

        return role;
    }

    @Override
    public boolean updateRole(String roleId, Role role) throws UpdateException {
        Role original = roleRepository.findById(roleId);
        try {
            roleRepository.update(role);
        }catch(MongoWriteException e){
            throw new UpdateException("failed to update role", e);
        }

        try {
            // TODO  move into repository?
            mongoRoleRepository.mongoDatabase().runCommand(new BasicDBObject()
                    .append("updateRole", role.roleName)
                    .append("roles", Collections.emptyList())
                    .append("privileges", role.privileges));
        }catch(MongoWriteException e){
            LOG.errorv("failed to update role in admin database %s", roleId);
            roleRepository.update(original);
            throw new UpdateException("failed to update role in admin database", e);
        }

        return true;
    }

    @Override
    public boolean deleteRole(String roleId) {
        return roleRepository.deleteById(roleId) && mongoRoleRepository.deleteById(roleId);
    }
}
