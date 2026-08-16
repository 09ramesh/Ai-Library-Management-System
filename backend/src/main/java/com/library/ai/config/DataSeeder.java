package com.library.ai.config;

import com.library.ai.model.Author;
import com.library.ai.model.Book;
import com.library.ai.model.Category;
import com.library.ai.repository.AuthorRepository;
import com.library.ai.repository.BookRepository;
import com.library.ai.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seed(AuthorRepository authors, CategoryRepository categories, BookRepository books) {
        return args -> {
            if (books.count() > 0) return;

            Author bloch = authors.save(new Author("Joshua Bloch"));
            Author sierra = authors.save(new Author("Kathy Sierra"));
            Author martin = authors.save(new Author("Robert C. Martin"));
            Author walls = authors.save(new Author("Craig Walls"));

            Category java = categories.save(new Category("Java"));
            Category programming = categories.save(new Category("Programming"));
            Category clean = categories.save(new Category("Software Engineering"));
            Category spring = categories.save(new Category("Spring Boot"));

            Book b1 = new Book();
            b1.setName("Effective Java");
            b1.setAuthor(bloch);
            b1.setCategory(List.of(java, programming));
            b1.setAvailability(true);

            Book b2 = new Book();
            b2.setName("Head First Java");
            b2.setAuthor(sierra);
            b2.setCategory(List.of(java, programming));
            b2.setAvailability(true);

            Book b3 = new Book();
            b3.setName("Clean Code");
            b3.setAuthor(martin);
            b3.setCategory(List.of(clean, programming));
            b3.setAvailability(false);

            Book b4 = new Book();
            b4.setName("Spring in Action");
            b4.setAuthor(walls);
            b4.setCategory(List.of(spring, programming));
            b4.setAvailability(true);

            books.saveAll(List.of(b1, b2, b3, b4));
        };
    }
}
