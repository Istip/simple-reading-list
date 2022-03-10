const BookList = ({ books }) => {
  return (
    <>
      <h1>BookList</h1>
      <ul style={list}>
        {books.map((book) => (
          <li key={book.id} style={listItem}>
            <p>
              <b>{book.title}</b>

              <small> - {book.author}</small>
            </p>

            <div>
              <button>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

// styles
const list = {
  padding: 0,
};

const listItem = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  margin: '20px',
};

export default BookList;
