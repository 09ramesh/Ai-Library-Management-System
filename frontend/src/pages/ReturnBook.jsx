function ReturnBook() {

  const issuedBooks = [
    {
      id: 1,
      student: "Rahul Sharma",
      book: "Java Programming",
      issueDate: "10 Aug 2026",
      dueDate: "20 Aug 2026"
    },
    {
      id: 2,
      student: "Priya Singh",
      book: "Clean Code",
      issueDate: "12 Aug 2026",
      dueDate: "22 Aug 2026"
    }
  ];


  const returnBook = (book) => {

    alert(
      `${book.book} returned by ${book.student}`
    );

  };


  return (

    <div>

      <div className="page-header">

        <div>

          <h1>Return Book</h1>

          <p>
            Manage issued books
          </p>

        </div>

      </div>


      <div className="table-card">

        <table>

          <thead>

            <tr>

              <th>Student</th>

              <th>Book</th>

              <th>Issue Date</th>

              <th>Due Date</th>

              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            {issuedBooks.map((book) => (

              <tr key={book.id}>

                <td>{book.student}</td>

                <td>{book.book}</td>

                <td>{book.issueDate}</td>

                <td>{book.dueDate}</td>

                <td>

                  <button
                    className="return-btn"
                    onClick={() => returnBook(book)}
                  >
                    Return
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default ReturnBook;