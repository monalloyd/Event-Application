package com.monalloyd.backend.service.jwt;

import java.util.List;

public class JwtDTO {
    private final String token;
    private final List<String> roles;

    public JwtDTO(String token, List<String> roles) {
        this.token = token;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public List<String> getRoles() {
        return roles;
    }
}
