package uk.co.cstdev.databasemanagement.service;

import uk.co.cstdev.databasemanagement.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User createUser(User user);

    boolean updateUser(String userId, User user);

    boolean deleteUser(String userId);
}
