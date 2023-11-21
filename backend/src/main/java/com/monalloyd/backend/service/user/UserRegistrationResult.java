package com.monalloyd.backend.service.user;

import com.monalloyd.backend.model.User;

import java.util.Optional;

public class UserRegistrationResult {
    private final Optional<User> user;
    private final Optional<String> error;

    public UserRegistrationResult(Optional<User> user, Optional<String> error) {
        this.user = user;
        this.error = error;
    }

    public Optional<User> getUser() {
        return user;
    }

    public Optional<String> getError() {
        return error;
    }
}
