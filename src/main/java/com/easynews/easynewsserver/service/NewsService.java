package com.easynews.easynewsserver.service;

import com.easynews.easynewsserver.model.FavoriteRequest;
import com.easynews.easynewsserver.model.NewsRequest;
import com.easynews.easynewsserver.model.db.News;
import com.easynews.easynewsserver.model.db.User;
import com.easynews.easynewsserver.repository.NewsRepository;
import com.easynews.easynewsserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {
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

    public News setFavorite(FavoriteRequest favoriteRequest) {
        News news = newsRepository.findById(favoriteRequest.newsId());
        System.out.println(news);
        User user = userRepository.findByEmail(favoriteRequest.userEmail());
        System.out.println(user);

        news.favoriteUser(user);

        return newsRepository.save(news);
    }
}
