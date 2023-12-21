package com.easynews.easynewsserver.model;

public record TextResponse(
        String email,
        String title,
        String customText
) {
}
