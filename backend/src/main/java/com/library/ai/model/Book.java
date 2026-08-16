package com.library.ai.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean availability = true;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Author author;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "book_categories",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> category = new ArrayList<>();

    public Long getId() { return id; }
    public String getName() { return name; }

    public void setName(String name) { this.name = name; }
    public boolean isAvailability() { return availability; }
    public void setAvailability(boolean availability) { this.availability = availability; }

    public Author getAuthor() { return author; }
    public void setAuthor(Author author) { this.author = author; }

    public List<Category> getCategory() { return category; }
    public void setCategory(List<Category> category) { this.category = category; }
}
