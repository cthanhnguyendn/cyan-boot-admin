package com.cyan.cyanadmin

import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "merchant", path = "merchant")
interface MerchantRepository :CrudRepository<Merchant,Long>

@RepositoryRestResource(collectionResourceRel = "user", path = "user")
interface UserRepository :CrudRepository<User,Long>