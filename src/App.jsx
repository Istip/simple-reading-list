import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { db } from './utils/firebase';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import Authentication from './components/Authentication';
import './App.css';

function App() {
  const [books, setBooks] = useState();
  const [user, setUser] = useState(null);

  const auth = getAuth();

  // Function to sign out the user
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Firestore collecton reference
    const booksRef = collection(db, 'books');

    // Queries
    const queryBook = query(booksRef, where('author', '==', 'jk rollin'));

    // Function to fetch the data from the books referenece
    onSnapshot(booksRef, (snapshot) => {
      // I have initialized an empty array
      let fetchedBooks = [];

      // Looping through the response data
      snapshot.docs.forEach((book) => {
        fetchedBooks.push({ ...book.data(), id: book.id });
      });

      // Finally added fetched data to the local state
      setBooks(fetchedBooks);
    });
  }, []);

  return (
    <div className="app-wrapper">
      <div className="header">
        <h1>Da books</h1>
        {user && (
          <button className="btn-logout" onClick={onSignOut}>
            <b>LOG OUT</b>
          </button>
        )}
      </div>

      {!user && <Authentication auth={auth} setUser={setUser} />}

      <>
        {user && (
          <>
            <AddBook />
            <BookList books={books} />
          </>
        )}
      </>
    </div>
  );
}

export default App;
