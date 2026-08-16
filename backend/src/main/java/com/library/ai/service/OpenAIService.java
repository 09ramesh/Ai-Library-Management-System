package com.library.ai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.library.ai.model.Book;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OpenAIService {
    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final String apiKey;
    private final String model;
    private final List<Book> books;

    public OpenAIService(
            @Value("${openai.api-key:}") String apiKey,
            @Value("${openai.model:gpt-5.6}") String model,
            RestClient.Builder builder,
            ObjectMapper objectMapper,
            com.library.ai.repository.BookRepository bookRepository) {
        this.apiKey = apiKey;
        this.model = model;
        this.objectMapper = objectMapper;
        this.books = bookRepository.findAll();
        this.restClient = builder.baseUrl("https://api.openai.com").build();
    }

    public String ask(String question, List<Book> currentBooks) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("OPENAI_API_KEY is not configured on the backend.");
        }

        String catalogue = currentBooks.stream()
                .map(book -> String.format(
                        "- %s | author: %s | category: %s | available: %s",
                        book.getName(),
                        book.getAuthor() != null ? book.getAuthor().getName() : "Unknown",
                        book.getCategory() == null ? "Unknown" :
                                book.getCategory().stream().map(c -> c.getName()).collect(Collectors.joining(", ")),
                        book.isAvailability()))
                .collect(Collectors.joining("\n"));

        if (catalogue.isBlank()) catalogue = "The library catalogue is currently empty.";

        String prompt = """
                You are the AI Library Assistant for a Library Management System.
                Answer the user's question clearly and concisely.

                Important rules:
                1. When the user asks about books in THIS library, use only the catalogue context below.
                2. Do not invent books, authors, availability, students, or library records.
                3. If the catalogue does not contain enough information, say so.
                4. You may answer general educational questions about programming and books.
                5. Never claim that you performed an action such as issuing or returning a book.

                CURRENT LIBRARY CATALOGUE:
                %s

                USER QUESTION:
                %s
                """.formatted(catalogue, question);

        try {
            String response = restClient.post()
                    .uri("/v1/responses")
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Bearer " + apiKey)
                    .body(new ResponseRequest(model, prompt))
                    .retrieve()
                    .body(String.class);

            return extractOutputText(response);
        } catch (Exception ex) {
            throw new IllegalStateException("AI request failed: " + ex.getMessage(), ex);
        }
    }

    private String extractOutputText(String json) throws Exception {
        JsonNode root = objectMapper.readTree(json);
        JsonNode output = root.path("output");

        StringBuilder text = new StringBuilder();
        if (output.isArray()) {
            for (JsonNode item : output) {
                JsonNode content = item.path("content");
                if (content.isArray()) {
                    for (JsonNode part : content) {
                        if ("output_text".equals(part.path("type").asText())) {
                            if (text.length() > 0) text.append("\n");
                            text.append(part.path("text").asText());
                        }
                    }
                }
            }
        }

        if (text.isEmpty()) {
            String direct = root.path("output_text").asText("");
            if (!direct.isBlank()) return direct;
            throw new IllegalStateException("The AI returned no output text.");
        }
        return text.toString();
    }

    private record ResponseRequest(String model, String input) {}
}
