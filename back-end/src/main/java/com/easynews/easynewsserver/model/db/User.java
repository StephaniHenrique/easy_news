package com.easynews.easynewsserver.model.db;

import com.easynews.easynewsserver.model.UserRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
@Entity(name = "users")
@EqualsAndHashCode(of = "email")
public class User implements UserDetails {

    @Id
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "role", nullable = false)
    private UserRole role;

    @Column(name = "isPremium", nullable = false)
    private String isPremium;

    @Column(name = "age", nullable = false)
    private String age;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "allowSlang", nullable = false)
    private String allowSlang;

    @Column(name = "allowRegionalExpressions", nullable = false)
    private String allowRegionalExpressions;

    @Column(name = "academicDegree", nullable = false)
    private String academicDegree;

    @Column(name = "isPcd", nullable = false)
    private String isPcd;

    @JsonIgnore
    @ManyToMany(mappedBy = "users")
    private Set<News> news;

    public User(UserRequest data) {
        this.email = data.email();
        this.password = data.password();
        this.name = data.name();
        this.role = data.role();
        this.isPremium = data.isPremium();
        this.age = data.age();
        this.state = data.state();
        this.allowSlang = data.allowSlang();
        this.allowRegionalExpressions = data.allowRegionalExpressions();
        this.academicDegree = data.academicDegree();
        this.isPcd = data.isPcd();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == UserRole.ADMIN) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}