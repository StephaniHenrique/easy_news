package com.easynews.easynewsserver.service;

import com.easynews.easynewsserver.config.TokenService;
import com.easynews.easynewsserver.model.UpdateUserRequest;
import com.easynews.easynewsserver.model.UserRequest;
import com.easynews.easynewsserver.model.UserResponse;
import com.easynews.easynewsserver.model.db.News;
import com.easynews.easynewsserver.model.db.User;
import com.easynews.easynewsserver.model.db.UserRole;
import com.easynews.easynewsserver.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    @Getter
    private final UserRepository userRepository;
    private AuthenticationManager authenticationManager;

    private TokenService tokenService;

    UserService(@Autowired UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // nesse caso, o username é o email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findById(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found!"));
    }


    public void registerUser(UserRequest userRegRequest) {
        User user = convertToUser(userRegRequest);

        if (this.userRepository.findById(userRegRequest.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuario ja registrado");
        } else {
            this.userRepository.save(user);
            System.out.println("Usuario registrado com sucesso");
        }
    }

    private User convertToUser(UserRequest userRegRequest) {
        User user = new User();
        user.setName(userRegRequest.name());
        user.setEmail(userRegRequest.email());
        user.setRole(userRegRequest.role());
        user.setPassword(new BCryptPasswordEncoder().encode(userRegRequest.password()));
        user.setAge(userRegRequest.age());
        user.setState(userRegRequest.state());
        user.setAllowSlang(userRegRequest.allowSlang());
        user.setAllowRegionalExpressions(userRegRequest.allowRegionalExpressions());
        user.setIsPcd(userRegRequest.isPcd());
        user.setAcademicDegree(userRegRequest.academicDegree());
        user.setIsPremium(userRegRequest.isPremium());

        return user;
    }

    public UserResponse getUser(String userEmail) {
        User user = userRepository.findById(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found!!"));
        System.out.println("Meu usuario lindo: " + user);
        return userToUserResponse(user);
    }

    private UserResponse userToUserResponse(User user) {
        return new UserResponse(
                user.getEmail(),
                user.getPassword(),
                user.getName(),
                user.getRole(),
                user.getIsPremium(),
                user.getAge(),
                user.getState(),
                user.getAllowSlang(),
                user.getAllowRegionalExpressions(),
                user.getAcademicDegree(),
                user.getIsPcd()
        );
    }

    public User updateUserData(UpdateUserRequest updateUserRequest) {
        User user = userRepository.findById(updateUserRequest.email())
                .orElseThrow(() -> new EntityNotFoundException("User not found!"));
        if (updateUserRequest.email().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email não pode ser nulo ou vazio");
        }
        user.setName(updateUserRequest.name());
        user.setState(updateUserRequest.state());
        user.setIsPremium(updateUserRequest.isPremium());
        user.setAge(updateUserRequest.age());
        user.setIsPcd(updateUserRequest.isPcd());
        user.setAllowSlang(updateUserRequest.allowSlang());
        user.setAllowRegionalExpressions(updateUserRequest.allowRegionalExpressions());
        user.setAcademicDegree(updateUserRequest.academicDegree());

        return userRepository.save(user);
    }

    public Set<String> getAllUserFavoriteNews(String userEmail) {
        User user = userRepository.findById(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found!"));
        Set<String> news = new HashSet<>();

        for (News news1 : user.getNews()) {
            news.add(news1.getId());
        }
        return news;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
