package com.easynews.easynewsserver.model.db;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "news")
public class News {

    @Id
    @Column(name = "idNews", nullable = false)
    private String id;

    @ManyToMany
    @JoinTable(name = "favorite_news",
            joinColumns = @JoinColumn(name = "news_fk"),
            inverseJoinColumns = @JoinColumn(name = "user_fk"))
    private Set<User> users;

    public void setId(String id) {
        this.id = id;
    }


    public void favoriteUser(User user) {
        users.add(user);
    }

    public String getId() {
        return id;
    }
}