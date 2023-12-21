package com.easynews.easynewsserver.entity.repository;

import com.easynews.easynewsserver.controllers.TextController;
import com.easynews.easynewsserver.model.TextRequest;
import com.easynews.easynewsserver.model.UserRequest;
import com.easynews.easynewsserver.model.db.Text;
import com.easynews.easynewsserver.model.db.User;
import com.easynews.easynewsserver.model.db.UserRole;
import com.easynews.easynewsserver.repository.TextRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import static org.assertj.core.api.Assertions.*;

/*
    Tecnicamente, essa classe não é necessária, pois o Spring Data JPA já testa a interface.
 */
@DataJpaTest
@ActiveProfiles("test")
@ComponentScan(basePackages = {"com.easynews.easynewsserver"}) // para o Spring ficar ciente de todos os componentes durante a dependency injection
class TextRepositoryTest {
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private TextRepository textRepository;
    @Autowired
    private TextController textController;

    @Test
    @DisplayName("Should get successfully all texts of an user from DB")
    void findAllByUserSuccess() {
        // create user
        User user = this.createUser(new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true"));

        // set text to user
        TextRequest text = new TextRequest(user.getEmail(), "title1", "text1");
        this.textController.saveText(text);

        // assert test
        List<Text> foundTexts = this.textRepository.findAllByUser(user);
        assertThat(foundTexts).isNotEmpty();
        assertThat(foundTexts).hasSize(1);
        assertThat(foundTexts.get(0).getText()).isEqualTo(text.customText());
        assertThat(foundTexts.get(0).getTitle()).isEqualTo(text.title());
        assertThat(foundTexts.get(0).getUser().getEmail()).isEqualTo(text.email());
    }

    private User createUser(UserRequest data) {
        User newUser = new User(data);
        this.entityManager.persist(newUser);
        return newUser;
    }

}