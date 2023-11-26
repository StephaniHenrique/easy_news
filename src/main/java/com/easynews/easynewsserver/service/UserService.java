package com.easynews.easynewsserver.service;

import com.easynews.easynewsserver.config.TokenService;
import com.easynews.easynewsserver.model.UpdateUserRequest;
import com.easynews.easynewsserver.model.UserRequest;
import com.easynews.easynewsserver.model.UserResponse;
import com.easynews.easynewsserver.model.db.News;
import com.easynews.easynewsserver.model.db.User;
import com.easynews.easynewsserver.model.db.UserRole;
import com.easynews.easynewsserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;

    private TokenService tokenService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username);
    }

    UserService(@Autowired UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(UserRequest userRegRequest) {
        User user = convertToUser(userRegRequest);

        if (this.userRepository.findById(userRegRequest.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuario ja registrado");
        } else {
            this.userRepository.save(user);
        }
    }


    private User convertToUser(UserRequest userRegRequest) {
        User user = new User();
        user.setName(userRegRequest.name());
        user.setEmail(userRegRequest.email());
        user.setRole(userRegRequest.role());
        user.setPassword(new BCryptPasswordEncoder().encode(userRegRequest.password()));
        user.setDateOfBirth(userRegRequest.dateOfBirth());
        user.setState(userRegRequest.state());
        user.setAllowSlang(userRegRequest.allowSlang());
        user.setAllowRegionalExpressions(userRegRequest.allowRegionalExpressions());
        user.setIsPcd(userRegRequest.isPcd());
        user.setAcademicDegree(userRegRequest.academicDegree());
        user.setIsPremium(userRegRequest.isPremium());

        return user;
    }

    public UserResponse getUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        System.out.println("Meu usuario lindo: " + user);
        return userToUserResponse(user);
    }

    private UserResponse userToUserResponse(User user) {
        return new UserResponse(
                user.getName(),
                user.getEmail(),
                user.getState(),
                user.getAllowSlang(),
                user.getAllowRegionalExpressions(),
                user.getIsPcd(),
                user.getIsPremium(),
                user.getAcademicDegree(),
                user.getDateOfBirth()
        );
    }

    public User updateUserData(UpdateUserRequest updateUserRequest) {
        User user = userRepository.findByEmail(updateUserRequest.email());
        user.setName(updateUserRequest.name());
        user.setState(updateUserRequest.state());
        user.setIsPremium(updateUserRequest.isPremium());
        user.setDateOfBirth(updateUserRequest.dateOfBirth());
        user.setIsPcd(updateUserRequest.isPcd());
        user.setAllowSlang(updateUserRequest.allowSlang());
        user.setAllowRegionalExpressions(updateUserRequest.allowRegionalExpressions());
        user.setAcademicDegree(updateUserRequest.academicDegree());

        return userRepository.save(user);
    }

    public Set<String> getAllUserFavoriteNews(String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        Set<String> news = new HashSet<>();

        for(News news1 : user.getNews()) {
            news.add(news1.getId());
        }
        return news;
    }
}
