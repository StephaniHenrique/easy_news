package com.easynews.easynewsserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.easynews.easynewsserver"})
public class EasynewsServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EasynewsServerApplication.class, args);
	}

}
