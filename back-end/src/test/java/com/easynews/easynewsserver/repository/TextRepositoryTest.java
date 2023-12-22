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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
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
    @DisplayName("Devem ser encontrados todos os textos de um usuário")
    void findAllByUserSuccess() {
        // create user
        User user = this.createUser(new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true"));

        // set text to user
        TextRequest text1 = new TextRequest(user.getEmail(), "title1", "text1");
        TextRequest text2 = new TextRequest(user.getEmail(), "title2", "text2");
        TextRequest text3 = new TextRequest(user.getEmail(), "title3", "text3");
        this.textController.saveText(text1);
        this.textController.saveText(text2);
        this.textController.saveText(text3);

        // assert test
        List<Text> foundTexts = this.textRepository.findAllByUser(user);
        assertThat(foundTexts).isNotEmpty();
        assertThat(foundTexts).hasSize(3);
        assertThat(foundTexts.get(0).getText()).isEqualTo(text1.customText());
        assertThat(foundTexts.get(0).getTitle()).isEqualTo(text1.title());
        assertThat(foundTexts.get(0).getUser().getEmail()).isEqualTo(text1.email());

        assertThat(foundTexts.get(0).getText()).isEqualTo(text2.customText());
        assertThat(foundTexts.get(0).getTitle()).isEqualTo(text2.title());
        assertThat(foundTexts.get(0).getUser().getEmail()).isEqualTo(text2.email());

        assertThat(foundTexts.get(0).getText()).isEqualTo(text3.customText());
        assertThat(foundTexts.get(0).getTitle()).isEqualTo(text3.title());
        assertThat(foundTexts.get(0).getUser().getEmail()).isEqualTo(text3.email());
    }

    private User createUser(UserRequest data) {
        User newUser = new User(data);
        this.entityManager.persist(newUser);
        return newUser;
    }

}