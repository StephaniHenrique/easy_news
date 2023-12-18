package com.easynews.easynewsserver.repository;

import com.easynews.easynewsserver.model.db.Text;
import com.easynews.easynewsserver.model.db.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TextRepository extends JpaRepository<Text, Integer> {
    List<Text> findAllByUser(User user);
}
