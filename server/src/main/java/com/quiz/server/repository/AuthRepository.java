package com.quiz.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quiz.server.model.User;

public interface AuthRepository extends JpaRepository<User,Long>{
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}
