package com.monalloyd.backend.service.jwt;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JwtService {
    private final JwtGenerator jwtGenerator;

    public JwtService(JwtGenerator jwtGenerator) {
        this.jwtGenerator = jwtGenerator;
    }

    public JwtDTO createJtwDTO(Authentication authentication) {
        List<String> scope = generateScope(authentication);
        String name = authentication.getName();
        String token = jwtGenerator.generate(scope, name);
        return new JwtDTO(token, scope);
    }

    private List<String> generateScope(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
    }

    public String refreshJtwDTO(Authentication authentication) {
        List<String> scope = generateScope(authentication);
        return jwtGenerator.generate(scope, authentication.getName());
    }
}
