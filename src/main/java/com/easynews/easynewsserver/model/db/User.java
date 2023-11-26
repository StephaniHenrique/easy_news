package com.easynews.easynewsserver.model.db;

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

    @Column(name = "dateOfBirth", nullable = false)
    private String dateOfBirth;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setAllowSlang(String allowSlang) {
        this.allowSlang = allowSlang;
    }

    public void setAllowRegionalExpressions(String allowRegionalExpressions) {
        this.allowRegionalExpressions = allowRegionalExpressions;
    }

    public void setAcademicDegree(String academicDegree) {
        this.academicDegree = academicDegree;
    }

    public void setIsPremium(String isPremium) {
        this.isPremium = isPremium;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public void setIsPcd(String isPcd) {
        this.isPcd = isPcd;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public UserRole getRole() {
        return role;
    }

    public String getIsPremium() {
        return isPremium;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public String getState() {
        return state;
    }

    public String getAllowSlang() {
        return allowSlang;
    }

    public String getAllowRegionalExpressions() {
        return allowRegionalExpressions;
    }

    public String getAcademicDegree() {
        return academicDegree;
    }

    public String getIsPcd() {
        return isPcd;
    }

    public Set<News> getNews() {
        return news;
    }

    public void setNews(Set<News> news) {
        this.news = news;
    }
}