package uk.co.cstdev.databasemanagement.repository;

import uk.co.cstdev.databasemanagement.model.User;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DefaultUserRepository implements UserRepository<User, String> {

}
