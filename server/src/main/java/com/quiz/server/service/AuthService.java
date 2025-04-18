package com.quiz.server.service;

import java.sql.Date;

import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.quiz.server.dto.AuthRequest;
import com.quiz.server.dto.AuthResponse;
import com.quiz.server.dto.LoginRequest;
import com.quiz.server.enums.Role;
import com.quiz.server.model.Token;
import com.quiz.server.model.User;
import com.quiz.server.repository.AuthRepository;
import com.quiz.server.repository.TokenRepository;
import com.quiz.server.util.JWTUtil;

import jakarta.servlet.http.HttpServletResponse;
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
    public AuthResponse userSignIn(LoginRequest request,HttpServletResponse response){
        User user=authRepository.findByEmail(request.getEmail()).orElseThrow(()->new RuntimeException("User not found"));
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid password");
        } 
        String accessToken=jwtUtil.generateToken(user, accessTime);
        Token token=tokenRepository.findByUser(user)
        .orElseGet(()->{
            Token tokenData=new Token();
            tokenData.setUser(user);
            tokenData.setRefreshToken(jwtUtil.generateToken(user, refreshTime));
            tokenData.setExpiryDate(new Date(System.currentTimeMillis()+refreshTime));
            return tokenRepository.save(tokenData);
        });
        ResponseCookie responseCookie=ResponseCookie.from("refreshToken", token.getRefreshToken())
        .httpOnly(true)
        .secure(false)
        .path("/")
        .maxAge(refreshTime)
        .build();
        response.addHeader("refreshToken", responseCookie.toString());
        return new AuthResponse(user.getId(),user.getUsername(),user.getEmail(),user.getRole(),accessToken,token.getRefreshToken());
    }
    public AuthResponse refresh(String refreshToken,HttpServletResponse response){
        if(refreshToken==null || refreshToken.isEmpty()){
            throw new RuntimeException("Token is missing");
        }
        if(!jwtUtil.validateToken(refreshToken)){
            throw new RuntimeException("Invalid token");
        }
        String username;
        try {
            username=jwtUtil.extractEmail(refreshToken);
        } catch (Exception e) {
            throw new RuntimeException("Could not extract email from token");
        }
        User user=authRepository.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));

        Token token=tokenRepository.findByUser(user).orElseThrow(()->new RuntimeException("Invalid token"));
        if(token.getRefreshToken().equals(refreshToken)){
            throw new RuntimeException("Token is mismatch");
        }

        String newAccessToken=jwtUtil.generateToken(user, accessTime);
        String newRefreshToken=jwtUtil.generateToken(user, refreshTime);
        token.setUser(user);
        token.setRefreshToken(refreshToken);
        token.setExpiryDate(new Date(System.currentTimeMillis()+refreshTime));
        tokenRepository.save(token);

        ResponseCookie responseCookie=ResponseCookie.from("refreshToken", newRefreshToken)
        .httpOnly(true)
        .secure(false)
        .path("/")
        .maxAge(refreshTime)
        .build();
        response.addHeader("refreshToken", responseCookie.toString());
        return new AuthResponse(user.getId(),user.getUsername(),user.getEmail(),user.getRole(),newAccessToken,newAccessToken);
    }  
    
    public void userSignOut(String refreshToken){
        Token token=tokenRepository.findByToken(refreshToken).orElseThrow(()->new RuntimeException("Invalid token"));
        tokenRepository.delete(token);
    }
}
