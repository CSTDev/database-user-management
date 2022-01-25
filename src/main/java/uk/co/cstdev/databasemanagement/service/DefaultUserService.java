package uk.co.cstdev.databasemanagement.service;

import uk.co.cstdev.databasemanagement.model.User;
import uk.co.cstdev.databasemanagement.repository.UserRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class DefaultUserService implements UserService{

    @Inject
    UserRepository<User,String> userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll().list();
    }

    @Override
    public User createUser(User user) {
        userRepository.persist(user);
        return user;
    }

    @Override
    public boolean updateUser(String userId, User user) {
        userRepository.update(user);
        return true;
    }

    @Override
    public boolean deleteUser(String userId) {
        return userRepository.deleteById(userId);
    }
}
