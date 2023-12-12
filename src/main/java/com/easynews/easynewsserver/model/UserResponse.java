package com.easynews.easynewsserver.model;

import com.easynews.easynewsserver.model.db.UserRole;

public record UserResponse(
        String name,
        String email,
        String state,
        String allowSlang,
        String allowRegionalExpressions,
        String isPcd,
        String isPremium,
        String academicDegree,
        String age
) {
}
