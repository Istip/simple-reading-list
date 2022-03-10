import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const BookList = ({ books }) => {
  // DELETE Functionality
  const onDelete = (e, id) => {
    e.preventDefault();

    // Creating the reference of the doc to be deleted
    const bookRef = doc(db, 'books', id);

    // Calling the delete function from firebase
    deleteDoc(bookRef)
      .then(() => {
        console.log('Deleted the document!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // UPDATE Functionality
  const onUpdate = (e, id) => {
    e.preventDefault();

    // Creating the reference of the doc to be deleted
    const bookRef = doc(db, 'books', id);

    // Calling the update function from firebase
    updateDoc(bookRef, {
      title: 'updated title',
      author: 'updated author',
    })
      .then(() => {
        console.log('Updated the document!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <br />
      <h3>BookList</h3>
      <ul style={list}>
        {books.map((book) => (
          <li key={book.id} style={listItem}>
            <p>
              <b>{book.title}</b>

              <small> - {book.author}</small>
            </p>

            <div>
              <button onClick={(e) => onDelete(e, book.id)}>❌</button>{' '}
              <button onClick={(e) => onUpdate(e, book.id)}>Update</button>
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
