package com.easynews.easynewsserver;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootTest
@EnableJpaRepositories(basePackages = {"com.easynews.easynewsserver"})
class EasynewsServerApplicationTests {

	@Test
	void contextLoads() {
	}

}
