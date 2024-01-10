package com.monalloyd.backend.service.user;

import java.util.Optional;

public class UserRegistrationResult {
    private final Optional<String> message;
    private final boolean isOk;

    public UserRegistrationResult(Optional<String> message, boolean isOk) {
        this.message = message;
        this.isOk = isOk;
    }
}
