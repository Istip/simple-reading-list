import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import './BookList.css';

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

  if (!books) {
    return 'Loading...';
  }

  return (
    <>
      <h1 className="title">BookList</h1>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-list-item">
            <h2>{book.title}</h2>

            <small>{book.author}</small>

            <div className="btn-group">
              <button
                className="btn-delete"
                onClick={(e) => onDelete(e, book.id)}
              >
                Delete
              </button>
              <button
                className="btn-success"
                onClick={(e) => onUpdate(e, book.id)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BookList;
