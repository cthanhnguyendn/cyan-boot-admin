package com.cyan.cyanadmin

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager
import org.springframework.data.repository.findByIdOrNull

@DataJpaTest
class RepositoriesTests @Autowired constructor(
        val entityManager: TestEntityManager,
        val userRepository: UserRepository,
        val merchantRepository: MerchantRepository) {

    @Test
    fun `When findByIdOrNull then return Merchant`() {
        val merchant = Merchant("Merchant 1", "Dear Spring community ...", "Lorem ipsum")
        entityManager.persist(merchant)
        entityManager.flush()
        val found = merchantRepository.findByIdOrNull(merchant.id!!)
        assertThat(found).isEqualTo(merchant)
    }
}