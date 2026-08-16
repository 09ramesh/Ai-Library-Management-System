import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [newBook, setNewBook] = useState({
    name: "",
    authorId: "",
    categoryId: "",
    availability: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [bookData, authorData, categoryData] = await Promise.all([
        api.getBooks(),
        api.getAuthors(),
        api.getCategories(),
      ]);
      setBooks(bookData || []);
      setAuthors(authorData || []);
      setCategories(categoryData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredBooks = useMemo(
    () =>
      books.filter((book) =>
        book.name?.toLowerCase().includes(search.toLowerCase())
      ),
    [books, search]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBook((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addBook = async (e) => {
    e.preventDefault();

    if (!newBook.authorId || !newBook.categoryId) {
      setError("Please select an author and category.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await api.createBook({
        name: newBook.name,
        availability: newBook.availability,
        authorId: Number(newBook.authorId),
        categoryId: [Number(newBook.categoryId)],
      });

      setNewBook({
        name: "",
        authorId: "",
        categoryId: "",
        availability: true,
      });
      setShowForm(false);
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Books</h1>
          <p>Manage books stored in PostgreSQL</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "+ Add Book"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-card">
          <h2>Add New Book</h2>

          <form onSubmit={addBook}>
            <input
              type="text"
              name="name"
              placeholder="Book Name"
              value={newBook.name}
              onChange={handleChange}
              required
            />

            <label>Author</label>
            <select
              name="authorId"
              value={newBook.authorId}
              onChange={handleChange}
              required
            >
              <option value="">Select Author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>

            <label>Category</label>
            <select
              name="categoryId"
              value={newBook.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label>
              <input
                type="checkbox"
                name="availability"
                checked={newBook.availability}
                onChange={handleChange}
              />{" "}
              Available
            </label>

            <button className="primary-btn" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Book"}
            </button>
          </form>
        </div>
      )}

      <div className="table-card">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading books...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="5">No books found.</td>
                </tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.name}</td>
                    <td>{book.author?.name || "—"}</td>
                    <td>
                      {book.category?.map((category) => category.name).join(", ") ||
                        "—"}
                    </td>
                    <td>
                      <span
                        className={
                          book.availability
                            ? "badge available"
                            : "badge issued"
                        }
                      >
                        {book.availability ? "Available" : "Issued"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Books;
