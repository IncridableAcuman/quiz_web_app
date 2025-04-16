package com.quiz.server.dto;

import javax.management.relation.Role;

import lombok.Data;

@Data
public class AuthResponse {
  private String username;
  private String email;
  private Role role;  
  private String accessToken;
  private String refreshToken;
}
