package com.easynews.easynewsserver.model;

public record TextResponse(
        Integer textId,
        String title,
        String text
) {
}
