package com.library.ai.controller;

import com.library.ai.model.Category;
import com.library.ai.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryRepository repository;

    public CategoryController(CategoryRepository repository) { this.repository = repository; }

    @GetMapping
    public List<Category> all() { return repository.findAll(); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Category create(@RequestBody Category category) { return repository.save(category); }
}
