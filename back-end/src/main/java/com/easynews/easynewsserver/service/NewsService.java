package com.easynews.easynewsserver.service;

import com.easynews.easynewsserver.model.FavoriteRequest;
import com.easynews.easynewsserver.model.NewsRequest;
import com.easynews.easynewsserver.model.db.News;
import com.easynews.easynewsserver.model.db.User;
import com.easynews.easynewsserver.repository.NewsRepository;
import com.easynews.easynewsserver.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class NewsService {
    @Getter
    private final NewsRepository newsRepository;
    private final UserRepository userRepository;

    NewsService(@Autowired NewsRepository newsRepository, @Autowired UserRepository userRepository) {
        this.newsRepository = newsRepository;
        this.userRepository = userRepository;
    }

    public News save(NewsRequest newsRequest) {
        News news = convertToNews(newsRequest);
        news = newsRepository.save(news);
        return (news);
    }

    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    private News convertToNews(NewsRequest newsRegRequest) {
        News news = new News();
        news.setId(newsRegRequest.newsId());

        return news;
    }

    public List<String> getAllUsersFavoriteNews(String userEmail) {
        User user = userRepository.findById(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found!!"));
        Set<News> userNews = user.getNews();

        List<String> newsIds = new ArrayList<>();

        for (News news : userNews) {
            newsIds.add(news.getId());
        }

        return newsIds;
    }

    public News setFavorite(FavoriteRequest favoriteRequest) {
        News news = newsRepository.findById(favoriteRequest.newsId())
                .orElseThrow(() -> new EntityNotFoundException("News not found"));
        User user = userRepository.findById(favoriteRequest.email())
                .orElseThrow(() -> new EntityNotFoundException("User not found!!"));

        news.favoriteUser(user);

        return newsRepository.save(news);
    }
}
