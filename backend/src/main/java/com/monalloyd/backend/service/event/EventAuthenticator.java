package com.monalloyd.backend.service.event;

import com.monalloyd.backend.model.Event;
import com.monalloyd.backend.model.User;
import org.springframework.security.core.Authentication;

public class EventAuthenticator {

    public boolean isOwner(Event event, Authentication authentication) {
        return event.getUser().getUsername().equals(authentication.getName());
    }

    public boolean isOwner(User user, Authentication authentication) {
        return user.getUsername().equals(authentication.getName());
    }

    public boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));
    }
}
