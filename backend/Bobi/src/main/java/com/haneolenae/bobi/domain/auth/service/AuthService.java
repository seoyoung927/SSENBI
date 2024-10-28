package com.haneolenae.bobi.domain.auth.service;

import com.haneolenae.bobi.domain.auth.dto.request.LoginRequest;
import com.haneolenae.bobi.domain.auth.dto.response.TokenResponse;

public interface AuthService {
    TokenResponse login(LoginRequest loginRequest);
}
