package uk.co.cstdev.databasemanagement.repository;

import uk.co.cstdev.databasemanagement.model.MongoUser;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;

@ApplicationScoped
@Named("mongo")
public class MongoUserRepository implements UserRepository<MongoUser, String> {
}
