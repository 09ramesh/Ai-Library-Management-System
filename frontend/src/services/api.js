const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let body = null;
  try {
    body = await response.json();
  } catch {
    // Some responses may not contain JSON.
  }

  if (!response.ok) {
    throw new Error(
      body?.message || body?.error || `Request failed with status ${response.status}`
    );
  }

  return body?.data ?? body;
}

export const api = {
  getBooks: () => request("/books"),
  getBook: (id) => request(`/books/${id}`),
  createBook: (book) =>
    request("/books", { method: "POST", body: JSON.stringify(book) }),
  updateBook: (id, book) =>
    request(`/books/${id}`, { method: "PUT", body: JSON.stringify(book) }),
  deleteBook: (id) => request(`/books/${id}`, { method: "DELETE" }),

  getAuthors: () => request("/authors"),
  createAuthor: (author) =>
    request("/authors", { method: "POST", body: JSON.stringify(author) }),

  getCategories: () => request("/categories"),
  createCategory: (category) =>
    request("/categories", { method: "POST", body: JSON.stringify(category) }),

  getUsers: () => request("/users"),
  createUser: (user) =>
    request("/users", { method: "POST", body: JSON.stringify(user) }),
  deleteUser: (id) => request(`/users/${id}`, { method: "DELETE" }),

  askAI: (question) =>
    request("/ai/ask", {
      method: "POST",
      body: JSON.stringify({ question }),
    }),
};

export default api;
