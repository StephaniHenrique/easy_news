package com.easynews.easynewsserver.model;

public record FavoriteRequest(
        String newsId,
        String email) {
}
