package com.library.ai.controller;

import com.library.ai.model.Author;
import com.library.ai.repository.AuthorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {
    private final AuthorRepository repository;

    public AuthorController(AuthorRepository repository) { this.repository = repository; }

    @GetMapping
    public List<Author> all() { return repository.findAll(); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Author create(@RequestBody Author author) { return repository.save(author); }
}
