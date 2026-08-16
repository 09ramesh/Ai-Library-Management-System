package com.library.ai.controller;

import com.library.ai.model.Book;
import com.library.ai.repository.BookRepository;
import com.library.ai.service.OpenAIService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
public class AIController {
    private final OpenAIService aiService;
    private final BookRepository bookRepository;

    public AIController(OpenAIService aiService, BookRepository bookRepository) {
        this.aiService = aiService;
        this.bookRepository = bookRepository;
    }

    @PostMapping("/ask")
    public AiResponse ask(@RequestBody AiRequest request) {
        if (request == null || request.question() == null || request.question().isBlank()) {
            throw new IllegalArgumentException("Question cannot be empty.");
        }
        List<Book> books = bookRepository.findAll();
        return new AiResponse(aiService.ask(request.question().trim(), books));
    }

    public record AiRequest(String question) {}
    public record AiResponse(String answer) {}
}
