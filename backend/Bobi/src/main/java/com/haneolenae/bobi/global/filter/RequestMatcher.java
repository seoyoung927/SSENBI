package com.haneolenae.bobi.global.filter;

import org.springframework.http.HttpMethod;
import org.springframework.util.AntPathMatcher;

public class RequestMatcher {
    private final String pattern;
    private final HttpMethod method;
    private final AntPathMatcher pathMatcher;
    private static final String urlPrefix="/api/v1/ssenbi";

    public RequestMatcher(String pattern, HttpMethod method) {
        this.pattern = pattern;
        this.method = method;
        this.pathMatcher = new AntPathMatcher();
    }

    public boolean matches(String requestPath, HttpMethod requestMethod) {
        return pathMatcher.match(urlPrefix+pattern, requestPath) && requestMethod == method;
    }
}
