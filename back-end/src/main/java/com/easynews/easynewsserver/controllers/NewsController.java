package com.easynews.easynewsserver.controllers;

import com.easynews.easynewsserver.model.FavoriteRequest;
import com.easynews.easynewsserver.model.NewsRequest;
import com.easynews.easynewsserver.model.db.News;
import com.easynews.easynewsserver.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/news")
public class NewsController {
    @Autowired
    private NewsService newsService;

    @PostMapping("/create")
    public News saveNews(@RequestBody NewsRequest newsRequest) {
        return newsService.save(newsRequest);
    }

    @GetMapping
    public ResponseEntity getAllNews() {
        var allPosts = newsService.getAllNews();
        return ResponseEntity.ok(allPosts);
    }

    @PostMapping("/favorite")
    public News setFavoriteNews(@RequestBody FavoriteRequest favoriteRequest) {
        return newsService.setFavorite(favoriteRequest);
    }

    @PostMapping("/user")
    public List<String> getAllUsersFavoriteNews(@RequestBody String userEmail) {
        return newsService.getAllUsersFavoriteNews(userEmail);
    }


}
