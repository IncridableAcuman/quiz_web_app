package com.quiz.server.util;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.quiz.server.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {
    private static final String secret=Base64.getEncoder().encodeToString("uzbekistanrepublicbestcountry123456789".getBytes(StandardCharsets.UTF_8));
    private static final long accessTime=15*60*1000;
    private static final long refreshTime=7*24*60*60*1000;

    public Key getSigningKey(){
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // tokenlarni yaratish qismi
    public String generateToken(User user,long expirationTime){
        return Jwts
                    .builder()
                    .claim("username", user.getUsername())
                    .claim("email", user.getEmail())
                    .claim("role", user.getRole())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis()+refreshTime))
                    .signWith(getSigningKey(),SignatureAlgorithm.HS256)
                    .compact();
    }

    // access,refresh
    public Map<String,String> generateTokens(User user){
        Map<String,String> tokens=new HashMap<>();
        tokens.put("accessToken", generateToken(user, accessTime));
        tokens.put("refreshToken", generateToken(user, accessTime));
        return tokens;
    }

    // validate 
    public boolean validateToken(String token){
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
                return true;
        } catch (Exception e) {
           return false;
        }
    }
    // eztract email-tokendan emailni ajratish
    public String extractEmail(String token){
        return Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
    }
}
