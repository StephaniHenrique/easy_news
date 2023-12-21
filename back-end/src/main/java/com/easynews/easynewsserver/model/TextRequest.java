package com.easynews.easynewsserver.model;

public record TextRequest(
        String email,
        String title,
        String customText
) {
}
