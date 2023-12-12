package com.easynews.easynewsserver.model;

public record UpdateUserRequest(String email,
                                String name,
                                String isPremium,
                                String isPcd,
                                String age,
                                String state,
                                String allowSlang,
                                String allowRegionalExpressions,
                                String academicDegree
) {
}
