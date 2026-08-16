import { useState } from "react";

function IssueBook() {

  const [form, setForm] = useState({
    student: "",
    book: "",
    issueDate: "",
    dueDate: ""
  });


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    alert(
      `Book "${form.book}" issued to ${form.student}`
    );

  };


  return (

    <div>

      <div className="page-header">

        <div>

          <h1>Issue Book</h1>

          <p>
            Issue a book to a student
          </p>

        </div>

      </div>


      <div className="form-card large">

        <form onSubmit={handleSubmit}>

          <label>Student</label>

          <select
            name="student"
            value={form.student}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Student
            </option>

            <option value="Rahul Sharma">
              Rahul Sharma
            </option>

            <option value="Priya Singh">
              Priya Singh
            </option>

          </select>


          <label>Book</label>

          <select
            name="book"
            value={form.book}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Book
            </option>

            <option value="Java Programming">
              Java Programming
            </option>

            <option value="Spring in Action">
              Spring in Action
            </option>

          </select>


          <label>Issue Date</label>

          <input
            type="date"
            name="issueDate"
            value={form.issueDate}
            onChange={handleChange}
            required
          />


          <label>Due Date</label>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
          />


          <button
            className="primary-btn"
            type="submit"
          >
            Issue Book
          </button>

        </form>

      </div>

    </div>

  );
}

export default IssueBook;