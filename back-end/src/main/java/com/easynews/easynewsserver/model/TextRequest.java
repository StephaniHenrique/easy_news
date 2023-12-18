package com.easynews.easynewsserver.model;

public record TextRequest(
        String userEmail,
        String title,
        String text
) {
}
