package com.easynews.easynewsserver.service;

import com.easynews.easynewsserver.model.UpdateUserRequest;
import com.easynews.easynewsserver.model.UserRequest;
import com.easynews.easynewsserver.model.UserResponse;
import com.easynews.easynewsserver.model.db.User;
import com.easynews.easynewsserver.model.db.UserRole;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
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
    EntityManager entityManager;

    @Autowired
    UserService userService;

    private User createUser(UserRequest data) {
        User newUser = new User(data);
        this.entityManager.persist(newUser);
        return newUser;
    }

    @Test
    @DisplayName("Deve devolver um usuário pelo seu email")
    void loadUserByUsername_userExists() {
        User user = this.createUser(new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true"));

        UserDetails retrievedUser = this.userService.loadUserByUsername(user.getEmail());
        assertEquals(user.getEmail(), retrievedUser.getUsername());
        assertEquals(user.getPassword(), retrievedUser.getPassword());
    }

    @Test
    @DisplayName("Deve devolver um erro pois o usuário não existe")
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
        // password não é checado pois Deve devolver criptografado
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
    @DisplayName("Deve devolver uma exceção pois o usuário já está registrado")
    void registerUser_failedRegister() {
        UserRequest user = new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true");
        this.userService.registerUser(user);
        assertThrows(ResponseStatusException.class, () -> {
            this.userService.registerUser(user);
        });
    }

    @Test
    @DisplayName("Deve devolver um usuário com sucesso pelo seu email")
    void getUser_successfulGet() {
        UserRequest user = new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true");
        this.userService.registerUser(user);
        UserResponse retrievedUser = this.userService.getUser(user.email());
        assertThat(retrievedUser).isNotNull();
        assertThat(retrievedUser.email()).isEqualTo(user.email());
        assertThat(retrievedUser.name()).isEqualTo(user.name());
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
    @DisplayName("Deve devolver uma exceção pois o usuário não existe")
    void getUser_userNotFound() {
        assertThrows(EntityNotFoundException.class, () -> {
            this.userService.getUser("email_nao_existente");
        });
    }

    @Test
    @DisplayName("Atualiza os dados de um usuário com sucesso")
    void updateUserData_successfulUpdate() {
        UserRequest user = new UserRequest("email1", "password1", "name1", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true");
        this.userService.registerUser(user);
        UpdateUserRequest updatedUser = new UpdateUserRequest("email1", "password1", "name2", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true");
        // atualiza apenas o nome
        this.userService.updateUserData(updatedUser);
        UserResponse retrievedUser = this.userService.getUser(user.email());
        assertThat(retrievedUser).isNotNull();

        // campo que mudou
        assertThat(retrievedUser.name()).isEqualTo(updatedUser.name());

        // campos que não mudaram
        assertThat(retrievedUser.email()).isEqualTo(user.email());
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
    @DisplayName("Deve devolver uma exceção pois o usuário não existe")
    void updateUserData_userNotFound() {
        assertThrows(EntityNotFoundException.class, () -> {
            UpdateUserRequest updatedUser = new UpdateUserRequest("email_nao_existente", "password1", "name2", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true");
            this.userService.updateUserData(updatedUser);
        });
    }
    @Test
    @DisplayName("Deve devolver uma exceção pois o email é nulo")
    void updateUserData_nullEmail() {
        assertThrows(Exception.class, () -> {
            UpdateUserRequest updatedUser = new UpdateUserRequest(null, "password1", "name2", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true");
            this.userService.updateUserData(updatedUser);
        });
    }

    @Test
    @DisplayName("Deve devolver uma exceção pois o email é vazio")
    void updateUserData_emptyEmail() {
        assertThrows(EntityNotFoundException.class, () -> {
            UpdateUserRequest updatedUser = new UpdateUserRequest("", "password1", "name2", UserRole.USER, "true", "18", "SP", "true", "true", "Ensino Superior", "true");
            this.userService.updateUserData(updatedUser);
        });
    }

    @Test
    void getAllUserFavoriteNews() {
    }

    @Test
    void getAllUsers() {
    }
}