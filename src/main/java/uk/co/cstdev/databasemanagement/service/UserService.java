package uk.co.cstdev.databasemanagement.service;

import uk.co.cstdev.databasemanagement.exceptions.CreateException;
import uk.co.cstdev.databasemanagement.exceptions.UpdateException;
import uk.co.cstdev.databasemanagement.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User createUser(User user) throws CreateException;

    boolean updateUser(String userId, User user) throws UpdateException;

    boolean deleteUser(String userId);
}
