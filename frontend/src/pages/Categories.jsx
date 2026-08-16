import { useEffect, useState } from "react";
import { api } from "../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setCategories((await api.getCategories()) || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await api.createCategory({ name });
      setName("");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Categories</h1>
          <p>Manage book categories</p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-card">
        <h2>Add Category</h2>
        <form onSubmit={add}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            required
          />
          <button className="primary-btn">Add Category</button>
        </form>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th></tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
