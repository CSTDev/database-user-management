package uk.co.cstdev.databasemanagement.repository;

import uk.co.cstdev.databasemanagement.model.User;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Default;

@ApplicationScoped
@Default
public class DefaultUserRepository implements UserRepository<User, String> {

}
