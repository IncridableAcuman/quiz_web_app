package com.quiz.server.service;

import java.sql.Date;

import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.quiz.server.dto.AuthRequest;
import com.quiz.server.dto.AuthResponse;
import com.quiz.server.enums.Role;
import com.quiz.server.model.Token;
import com.quiz.server.model.User;
import com.quiz.server.repository.AuthRepository;
import com.quiz.server.repository.TokenRepository;
import com.quiz.server.util.JWTUtil;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final AuthRepository authRepository;
    private final JWTUtil jwtUtil;
    private final TokenRepository tokenRepository;
    private static final long accessTime=15*60*1000;
    private static final long refreshTime=7*24*60*60*1000;

    @Transactional
   public AuthResponse userSignUp(AuthRequest request,HttpServletResponse response){
    if(authRepository.findByEmail(request.getEmail()).isPresent()){
        throw new RuntimeException("User already exist");
    }
    // user
    User user=new User();
    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(Role.student);
    authRepository.save(user);
    // Token 
    String refreshToken=jwtUtil.generateToken(user, refreshTime);
    Token token=new Token();
    token.setUser(user);
    token.setRefreshToken(refreshToken);
    token.setExpiryDate(new Date(System.currentTimeMillis()+refreshTime));
    tokenRepository.save(token);
    // cookie
    ResponseCookie responseCookie=ResponseCookie.from("refreshToken", refreshToken)
        .httpOnly(true)
        .secure(false)
        .path("/")
        .maxAge(refreshTime)
        .build();
        response.addHeader("Set-Cookie", responseCookie.toString());
        return new AuthResponse(user.getId(),user.getUsername(),user.getEmail(),user.getRole(),jwtUtil.generateToken(user, accessTime),refreshToken);
   }
}
