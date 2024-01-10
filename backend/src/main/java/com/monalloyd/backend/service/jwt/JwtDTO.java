package com.monalloyd.backend.service.jwt;

import java.util.List;

public record JwtDTO(String token, List<String> roles) {
}
