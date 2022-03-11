import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './utils/firebase';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import Authentication from './components/Authentication';

function App() {
  const [books, setBooks] = useState();

  const auth = getAuth();

  useEffect(() => {
    // Firestore collecton reference
    const booksRef = collection(db, 'books');

    // Queries
    const queryBook = query(booksRef, where('author', '==', 'jk rollin'));

    // Function to fetch the data from the books referenec
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
    <>
      <h1>Da books</h1>
      <Authentication />
      <AddBook />
      <BookList books={books} />
    </>
  );
}

export default App;
