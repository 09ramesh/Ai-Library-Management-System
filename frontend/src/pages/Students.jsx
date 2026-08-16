import { useEffect, useState } from "react";
import { api } from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.getUsers();
      setStudents(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setNewStudent((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const addStudent = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await api.createUser({
        name: newStudent.name,
        profile: {
          email: newStudent.email,
          phone: Number(newStudent.phone),
          address: newStudent.address,
        },
      });

      setNewStudent({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      await loadStudents();
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
          <h1>Students</h1>
          <p>Manage registered students stored in PostgreSQL</p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-card">
        <h2>Add Student</h2>

        <form onSubmit={addStudent}>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={newStudent.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newStudent.address}
            onChange={handleChange}
          />

          <button className="primary-btn" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add Student"}
          </button>
        </form>
      </div>

      <div className="table-card">
        {loading ? (
          <p>Loading students...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5">No students found.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.profile?.email || "—"}</td>
                    <td>{student.profile?.phone || "—"}</td>
                    <td>{student.profile?.address || "—"}</td>
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

export default Students;
