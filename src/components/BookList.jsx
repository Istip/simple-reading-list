import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const BookList = ({ books }) => {
  const onDelete = (e, id) => {
    e.preventDefault();

    // Creating the reference of the doc to be deleted
    const bookRef = doc(db, 'books', id);

    // Calling the function
    deleteDoc(bookRef)
      .then(() => {
        console.log('Deleted the document!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
              <button onClick={(e) => onDelete(e, book.id)}>❌</button>
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
