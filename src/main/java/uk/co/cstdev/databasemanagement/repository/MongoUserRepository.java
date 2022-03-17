package uk.co.cstdev.databasemanagement.repository;

import uk.co.cstdev.databasemanagement.model.MongoUser;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MongoUserRepository implements UserRepository<MongoUser, String> {
}
