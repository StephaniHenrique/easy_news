package com.easynews.easynewsserver.model;

import com.easynews.easynewsserver.model.db.UserRole;

public record UserRequest(
        String email,
        String password,
        String name,
        UserRole role,
        String isPremium,
        String age,
        String state,
        String allowSlang,
        String allowRegionalExpressions,
        String academicDegree,
        String isPcd
        ) {
}
