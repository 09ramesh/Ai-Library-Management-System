package com.library.ai.config;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handle(Exception ex) {
        return Map.of("message", ex.getMessage() == null ? "Request failed." : ex.getMessage());
    }
}
