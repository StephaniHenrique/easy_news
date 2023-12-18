package com.easynews.easynewsserver.repository;

import com.easynews.easynewsserver.model.db.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface NewsRepository extends JpaRepository<News, String> {
}
