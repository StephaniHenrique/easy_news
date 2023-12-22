package com.easynews.easynewsserver.service;

import com.easynews.easynewsserver.model.FavoriteRequest;
import com.easynews.easynewsserver.model.NewsRequest;
import com.easynews.easynewsserver.model.UserRequest;
import com.easynews.easynewsserver.model.db.User;
import com.easynews.easynewsserver.model.db.News;
import com.easynews.easynewsserver.model.db.UserRole;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;


@DataJpaTest
@ActiveProfiles("test")
@ComponentScan(basePackages = {"com.easynews.easynewsserver"}) // para o Spring ficar ciente de todos os componentes durante a dependency injection
class NewsServiceTest {
    @Autowired
    EntityManager entityManager;

    @Autowired
    NewsService newsService;

    @Autowired
    UserService userService;

    private User createUser(UserRequest data) {
        User newUser = new User(data);
        this.entityManager.persist(newUser);
        return newUser;
    }

    @Test
    @DisplayName("Deve salvar uma notícia no banco de dados com sucesso (teste de integração)")
    void save() {
        NewsRequest news1 = new NewsRequest("newsId1");
        this.newsService.save(news1);
        Optional<News> foundNews = newsService.getNewsRepository().findById("newsId1");
        assertThat(foundNews).isNotEmpty();
        assertThat(foundNews.get().getId()).isEqualTo("newsId1");
    }

    @Test
    @DisplayName("Deve salvar com sucesso três notícias no banco de dados")
    void getAllNews() {
        NewsRequest news1 = new NewsRequest("newsId1");
        NewsRequest news2 = new NewsRequest("newsId2");
        NewsRequest news3 = new NewsRequest("newsId3");
        this.newsService.save(news1);
        this.newsService.save(news2);
        this.newsService.save(news3);
        List<News> retrievedNews = this.newsService.getAllNews();
        assertThat(retrievedNews).isNotEmpty();
        assertThat(retrievedNews).hasSize(3);
        assertThat(retrievedNews.get(0).getId()).isEqualTo("newsId1");
        assertThat(retrievedNews.get(1).getId()).isEqualTo("newsId2");
        assertThat(retrievedNews.get(2).getId()).isEqualTo("newsId3");
    }

    @Test
    @DisplayName("Deve lançar uma exceção pois o usuário não existe")
    void getAllUsersFavoriteNews_userNotFound() {
        assertThrows(EntityNotFoundException.class, () -> this.newsService.getAllUsersFavoriteNews("email_usuario_inexistente"));
    }

    @Test
    @DisplayName("Deve favoritar três notícias com sucesso e ")
    // acaba testando também o método getAllUsersFavoriteNews
    void setFavorite_successfulSet() {
        String newsId1 = "newsId1";
        String newsId2 = "newsId2";
        String newsId3 = "newsId3";
        NewsRequest news1 = new NewsRequest(newsId1);
        NewsRequest news2 = new NewsRequest(newsId2);
        NewsRequest news3 = new NewsRequest(newsId3);
        this.newsService.save(news1);
        this.newsService.save(news2);
        this.newsService.save(news3);

        String email = "email1";
        this.userService.registerUser(new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true"));

        this.newsService.setFavorite(new FavoriteRequest(news1.newsId(), email));
        this.newsService.setFavorite(new FavoriteRequest(news2.newsId(), email));
        this.newsService.setFavorite(new FavoriteRequest(news3.newsId(), email));

        List<String> retrievedNews = this.newsService.getAllUsersFavoriteNews(email);

        assertThat(retrievedNews).isNotEmpty();
        assertThat(retrievedNews).hasSize(3);
        assertThat(retrievedNews.get(0)).isEqualTo(newsId1);
        assertThat(retrievedNews.get(0)).isEqualTo(newsId2);
        assertThat(retrievedNews.get(0)).isEqualTo(newsId3);
    }

    @Test
    @DisplayName("Deve devolver uma exceção pois a notícia não existe")
    void setFavorite_newsNotFound() {
        User user = this.createUser(new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true"));
        assertThrows(EntityNotFoundException.class, () -> this.newsService.setFavorite(new FavoriteRequest("id_noticia_inexistente", user.getEmail())));
    }
    @Test
    @DisplayName("Deve devolver uma exceção pois o usuário não existe")
    void setFavorite_userNotFound() {
        String newsId1 = "newsId1";
        assertThrows(EntityNotFoundException.class, () -> this.newsService.setFavorite(new FavoriteRequest(newsId1, "email_usuario_inexistente")));
    }
}