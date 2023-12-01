package com.monalloyd.backend.controller;

import com.monalloyd.backend.service.jwt.JwtDTO;
import com.monalloyd.backend.service.jwt.JwtService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("session")
public class SessionController {
    private final JwtService jwtService;

    public SessionController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @GetMapping(produces="application/json")
    JwtDTO getJwt(Authentication authentication) {
        return jwtService.createJtwDTO(authentication);
    }

    @GetMapping("refresh")
    String getFreshJwt(Authentication authentication) {
        return jwtService.refreshJtwDTO(authentication);
    }
}
