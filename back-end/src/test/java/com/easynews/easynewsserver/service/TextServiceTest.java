package com.easynews.easynewsserver.service;

import com.easynews.easynewsserver.model.TextRequest;
import com.easynews.easynewsserver.model.TextResponse;
import com.easynews.easynewsserver.model.UserRequest;
import com.easynews.easynewsserver.model.db.Text;
import com.easynews.easynewsserver.model.db.UserRole;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import com.easynews.easynewsserver.model.db.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
@ActiveProfiles("test")
@ComponentScan(basePackages = {"com.easynews.easynewsserver"}) // para o Spring ficar ciente de todos os componentes durante a dependency injection
class TextServiceTest {
    @Autowired
    EntityManager entityManager;

    @Autowired
    TextService textService;

    private User createUser(UserRequest data) {
        User newUser = new User(data);
        this.entityManager.persist(newUser);
        return newUser;
    }

    @Test
    @DisplayName("Deve salvar um texto no banco de dados com sucesso (teste de integração)")
    void saveText_successfulSave() {
        // cria usuário e três textos em seu nome
        User user = this.createUser(new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true"));
        TextRequest text1 = new TextRequest(user.getEmail(), "title1", "text1");
        TextRequest text2 = new TextRequest(user.getEmail(), "title2", "text2");
        TextRequest text3 = new TextRequest(user.getEmail(), "title3", "text3");

        // salva os três textos no banco de dados
        this.textService.saveText(text1);
        this.textService.saveText(text2);
        this.textService.saveText(text3);

        // verifica se o texto foi salvo corretamente (diretamente do textRepository)
        List<Text> retrievedText = this.textService.getTextRepository().findAllByUser(user);
        assertThat(retrievedText).isNotEmpty();
        assertThat(retrievedText).hasSize(3);
        assertThat(retrievedText.get(0).getText()).isEqualTo("text1");
        assertThat(retrievedText.get(1).getText()).isEqualTo("text2");
        assertThat(retrievedText.get(2).getText()).isEqualTo("text3");
    }

    @Test
    @DisplayName("Deve devolver uma exceção pois o usuário não existe")
    void saveText_userNotFound() {
        assertThrows(EntityNotFoundException.class, () -> {
            TextRequest text1 = new TextRequest("email1", "title1", "text1");
            this.textService.saveText(text1);
        });
    }

    @Test
    @DisplayName("Devem ser retornados todos os textos de um usuário")
    void getAllUsersText_successfulGet() {
        User user = this.createUser(new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true"));

        this.textService.saveText(new TextRequest(user.getEmail(), "title1", "text1"));
        this.textService.saveText(new TextRequest(user.getEmail(), "title2", "text2"));
        this.textService.saveText(new TextRequest(user.getEmail(), "title3", "text3"));
        List<TextResponse> foundTexts = this.textService.getAllUsersText(user.getEmail());
        assertThat(foundTexts).isNotEmpty();
        assertThat(foundTexts).hasSize(3);
        assertThat(foundTexts.get(0).customText()).isEqualTo("text1");
        assertThat(foundTexts.get(1).customText()).isEqualTo("text2");
        assertThat(foundTexts.get(2).customText()).isEqualTo("text3");
    }
    @Test
    @DisplayName("Deve devolver uma exceção caso o usuário não exista")
    void getAllUsersText_userNotFound() {
        assertThrows(EntityNotFoundException.class, () -> this.textService.getAllUsersText("email inexistente"));
    }

}