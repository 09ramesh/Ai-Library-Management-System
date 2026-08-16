import { useEffect, useState } from "react";
import { api } from "../services/api";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setAuthors((await api.getAuthors()) || []);
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
      await api.createAuthor({ name });
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
          <h1>Authors</h1>
          <p>Manage book authors</p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-card">
        <h2>Add Author</h2>
        <form onSubmit={add}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Author name"
            required
          />
          <button className="primary-btn">Add Author</button>
        </form>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th></tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Authors;
