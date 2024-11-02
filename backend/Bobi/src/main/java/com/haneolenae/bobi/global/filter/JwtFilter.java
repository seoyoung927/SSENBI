package com.haneolenae.bobi.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.haneolenae.bobi.domain.auth.util.JwtTokenProvider;
import com.haneolenae.bobi.global.dto.ApiResponse;
import com.haneolenae.bobi.global.dto.ApiType;
import com.haneolenae.bobi.global.exception.ApiException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Slf4j
public class JwtFilter implements Filter {

    private final Set<RequestMatcher> excludedPaths = new HashSet<>();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final JwtTokenProvider jwtTokenProvider;

    public JwtFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
        // 제외하고 싶은 URL과 메소드 조합을 추가
        excludedPaths.add(new RequestMatcher("/member", HttpMethod.POST));
        excludedPaths.add(new RequestMatcher("/auth/login", HttpMethod.POST));
        excludedPaths.add(new RequestMatcher("/auth/refresh", HttpMethod.POST));
        excludedPaths.add(new RequestMatcher("/general/**", HttpMethod.GET));
    }
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.info("jwt filter init");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.info("jwt filter filter in");
        HttpServletRequest httpRequest = (HttpServletRequest) request;


        if (shouldExclude(httpRequest)) {
            log.info("exclude");
            chain.doFilter(request, response);
            return;
        }

        try {
            String accessToken = httpRequest.getHeader("Authorization");

            if (accessToken == null || !jwtTokenProvider.validateToken(accessToken)) {
                throw new ApiException(ApiType.ACCESS_TOKEN_INVALID);
            }
            chain.doFilter(request, response);
        }catch(ApiException e){
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(e.getApiType().getStatus().value());
            httpResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
            httpResponse.setCharacterEncoding("UTF-8");

            ApiResponse<Object> errorResponse =new ApiResponse<Object>(e.getApiType(), e.getResult());

            String jsonResponse = objectMapper.writeValueAsString(errorResponse);

            httpResponse.getWriter().write(jsonResponse);
        }

        log.info("jwt filter filter out");
    }

    private boolean shouldExclude(HttpServletRequest request) {
        String requestPath = request.getRequestURI();
        String method = request.getMethod();

        System.out.println(requestPath);

        return excludedPaths.stream()
                .anyMatch(matcher -> matcher.matches(requestPath, HttpMethod.valueOf(method)));
    }

    @Override
    public void destroy() {
        System.out.println("jwt filter destroy");
    }
}
