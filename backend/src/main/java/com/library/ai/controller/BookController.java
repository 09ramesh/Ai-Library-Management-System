package com.library.ai.controller;

import com.library.ai.model.Author;
import com.library.ai.model.Book;
import com.library.ai.model.Category;
import com.library.ai.repository.AuthorRepository;
import com.library.ai.repository.BookRepository;
import com.library.ai.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookRepository books;
    private final AuthorRepository authors;
    private final CategoryRepository categories;

    public BookController(BookRepository books, AuthorRepository authors, CategoryRepository categories) {
        this.books = books;
        this.authors = authors;
        this.categories = categories;
    }

    @GetMapping
    public List<Book> all() { return books.findAll(); }

    @GetMapping("/{id}")
    public Book one(@PathVariable Long id) {
        return books.findById(id).orElseThrow();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Book create(@RequestBody BookRequest request) {
        Book book = new Book();
        book.setName(request.name());
        book.setAvailability(request.availability() == null || request.availability());
        book.setAuthor(authors.findById(request.authorId()).orElseThrow());
        book.setCategory(categories.findAllById(request.categoryId()));
        return books.save(book);
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable Long id, @RequestBody BookRequest request) {
        Book book = books.findById(id).orElseThrow();
        book.setName(request.name());
        if (request.availability() != null) book.setAvailability(request.availability());
        if (request.authorId() != null) {
            Author author = authors.findById(request.authorId()).orElseThrow();
            book.setAuthor(author);
        }
        if (request.categoryId() != null) {
            List<Category> categoryList = categories.findAllById(request.categoryId());
            book.setCategory(categoryList);
        }
        return books.save(book);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { books.deleteById(id); }

    public record BookRequest(
        String name,
        Boolean availability,
        Long authorId,
        List<Long> categoryId
    ) {}
}
