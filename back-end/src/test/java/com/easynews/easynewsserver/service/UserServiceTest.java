package com.easynews.easynewsserver.service;

import com.easynews.easynewsserver.model.UserRequest;
import com.easynews.easynewsserver.model.UserResponse;
import com.easynews.easynewsserver.model.db.User;
import com.easynews.easynewsserver.model.db.UserRole;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@ComponentScan(basePackages = {"com.easynews.easynewsserver"}) // para o Spring ficar ciente de todos os componentes durante a dependency injection
class UserServiceTest {
    @Autowired
    private UserService userService;
    @Autowired
    private EntityManager entityManager;

    private User createUser(UserRequest data) {
        User newUser = new User(data);
        this.entityManager.persist(newUser);
        return newUser;
    }

    @Test
    @DisplayName("Retorna um usuário pelo seu email")
    void loadUserByUsername_userExists() {
        User user = this.createUser(new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true"));

        UserDetails retrievedUser = this.userService.loadUserByUsername(user.getEmail());
        assertEquals(user.getEmail(), retrievedUser.getUsername());
        assertEquals(user.getPassword(), retrievedUser.getPassword());
    }

    @Test
    @DisplayName("Retorna um erro pois o usuário não existe")
    void loadUserByUsername_userDoesNotExist() {
        assertThrows(EntityNotFoundException.class, () -> {
            this.userService.loadUserByUsername("email_nao_existente");
        });
    }

    @Test
    @DisplayName("Registra um novo usuário no banco de dados")
    void registerUser_successfulRegister() {
        UserRequest user = new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true");
        this.userService.registerUser(user);
        Optional<User> retrievedUser = this.userService.getUserRepository().findById(user.email());
        assertThat(retrievedUser).isNotNull();
        assertThat(retrievedUser.get().getEmail()).isEqualTo(user.email());
        assertThat(retrievedUser.get().getName()).isEqualTo(user.name());
        assertThat(retrievedUser.get().getPassword()).isEqualTo(user.password());
        assertThat(retrievedUser.get().getRole()).isEqualTo(user.role());
        assertThat(retrievedUser.get().getIsPremium()).isEqualTo(user.isPremium());
        assertThat(retrievedUser.get().getAge()).isEqualTo(user.age());
        assertThat(retrievedUser.get().getState()).isEqualTo(user.state());
        assertThat(retrievedUser.get().getAllowSlang()).isEqualTo(user.allowSlang());
        assertThat(retrievedUser.get().getAllowRegionalExpressions()).isEqualTo(user.allowRegionalExpressions());
        assertThat(retrievedUser.get().getAcademicDegree()).isEqualTo(user.academicDegree());
        assertThat(retrievedUser.get().getIsPcd()).isEqualTo(user.isPcd());
    }

    @Test
    @DisplayName("Retorna uma exceção pois o usuário já está registrado")
    void registerUser_failedRegister() {
        UserRequest user = new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true");
        this.userService.registerUser(user);
        assertThrows(ResponseStatusException.class, () -> {
            this.userService.registerUser(user);
        });
    }

    @Test
    void getUser() {
        UserRequest user = new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true");
        this.userService.registerUser(user);
        UserResponse retrievedUser = this.userService.getUser(user.email());
        assertThat(retrievedUser).isNotNull();
        assertThat(retrievedUser.email()).isEqualTo(user.email());
        assertThat(retrievedUser.name()).isEqualTo(user.name());
        assertThat(retrievedUser.password()).isEqualTo(user.password());
        assertThat(retrievedUser.role()).isEqualTo(user.role());
        assertThat(retrievedUser.isPremium()).isEqualTo(user.isPremium());
        assertThat(retrievedUser.age()).isEqualTo(user.age());
        assertThat(retrievedUser.state()).isEqualTo(user.state());
        assertThat(retrievedUser.allowSlang()).isEqualTo(user.allowSlang());
        assertThat(retrievedUser.allowRegionalExpressions()).isEqualTo(user.allowRegionalExpressions());
        assertThat(retrievedUser.academicDegree()).isEqualTo(user.academicDegree());
        assertThat(retrievedUser.isPcd()).isEqualTo(user.isPcd());
    }

    @Test
    void updateUserData() {
    }

    @Test
    void getAllUserFavoriteNews() {
    }

    @Test
    void getAllUsers() {
    }
}