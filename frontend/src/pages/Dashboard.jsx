import { useEffect, useState } from "react";
import { api } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    books: 0,
    students: 0,
    available: 0,
    issued: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [books, students] = await Promise.all([
          api.getBooks(),
          api.getUsers(),
        ]);

        const bookList = books || [];

        setStats({
          books: bookList.length,
          students: (students || []).length,
          available: bookList.filter((book) => book.availability).length,
          issued: bookList.filter((book) => !book.availability).length,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    load();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Live data from your Spring Boot + PostgreSQL backend</p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div>
            <p>Total Books</p>
            <h2>{stats.books}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div>
            <p>Total Students</p>
            <h2>{stats.students}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div>
            <p>Issued Books</p>
            <h2>{stats.issued}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div>
            <p>Available Books</p>
            <h2>{stats.available}</h2>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2>Backend Connection</h2>
        <p>
          The dashboard is now loading books and students through the Spring
          Boot REST API.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
