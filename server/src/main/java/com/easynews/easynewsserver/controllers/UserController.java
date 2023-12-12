package com.easynews.easynewsserver.controllers;

import com.easynews.easynewsserver.config.TokenService;
import com.easynews.easynewsserver.model.*;
import com.easynews.easynewsserver.model.db.News;
import com.easynews.easynewsserver.model.db.User;
import com.easynews.easynewsserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

//@CrossOrigin
@RestController
@RequestMapping(path = "/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    TokenService tokenService;

    @PostMapping("/authenticate")
    public AuthResponse authenticateUser(@RequestBody AuthRequest authRequest) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(authRequest.email(), authRequest.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return new AuthResponse(token);
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody UserRequest userRequest) {
        userService.registerUser(userRequest);
    }

    @PostMapping("/update")
    public User updateUserData(@RequestBody UpdateUserRequest updateUserRequest) {
        return userService.updateUserData(updateUserRequest);
    }

    @GetMapping("/getUser")
    public UserResponse getUser(@RequestParam String userEmail) {
        System.out.println("user email: " + userEmail);
        return userService.getUser(userEmail);
    }

    @GetMapping("/getUserFavoriteNews")
    public Set<String> getUserFavoriteNews(@RequestBody GetUserRequest getUserRequest) {
        return userService.getAllUserFavoriteNews(getUserRequest.userEmail());
    }

    @GetMapping("/allUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}