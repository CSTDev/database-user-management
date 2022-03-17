package uk.co.cstdev.databasemanagement.service;

import com.mongodb.MongoWriteException;
import org.jboss.logging.Logger;
import uk.co.cstdev.databasemanagement.exceptions.CreateException;
import uk.co.cstdev.databasemanagement.exceptions.UpdateException;
import uk.co.cstdev.databasemanagement.model.MongoUser;
import uk.co.cstdev.databasemanagement.model.User;
import uk.co.cstdev.databasemanagement.repository.UserRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class DefaultUserService implements UserService{

    private static final Logger LOG = Logger.getLogger(DefaultUserService.class);

    @Inject
    UserRepository<User,String> userRepository;

    @Inject
    UserRepository<MongoUser, String> mongoUserRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll().list();
    }

    @Override
    public User createUser(User user) throws CreateException {
        try {
            userRepository.persist(user);
        } catch (MongoWriteException e) {
            throw new CreateException("failed to create user in database", e);
        }

        try {
            MongoUser mUser = new MongoUser(user);
            mongoUserRepository.persist(mUser);
        } catch (MongoWriteException e){
            if(!userRepository.deleteById(user.userId)){
                LOG.warnv("failed to roll back user creation, userID: %s", user.userId);
            }
            throw new CreateException("failed to create user in admin database");
        }
        return user;
    }

    @Override
    public boolean updateUser(String userId, User user) throws UpdateException {
        User original = userRepository.findById(userId);

        try {
            userRepository.update(user);
        } catch (MongoWriteException e){
            throw new UpdateException("failed to update user", e);
        }

        try {
            MongoUser mUser = new MongoUser(user);
            mongoUserRepository.update(mUser);
        } catch (MongoWriteException e) {
            LOG.errorv("failed to update user in admin database %s", userId);
            userRepository.update(original);
            throw new UpdateException("failed to update user in admin database", e);
        }
        return true;
    }

    @Override
    public boolean deleteUser(String userId) {
        return userRepository.deleteById(userId) && mongoUserRepository.deleteById(userId);
    }
}
