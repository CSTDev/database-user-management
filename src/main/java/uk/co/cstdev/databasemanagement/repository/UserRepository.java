package uk.co.cstdev.databasemanagement.repository;

import io.quarkus.mongodb.panache.PanacheMongoRepositoryBase;

public interface UserRepository<E,I> extends PanacheMongoRepositoryBase<E,I> {
}
