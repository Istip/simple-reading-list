import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './utils/firebase';

function App() {
  const [books, setBooks] = useState();

  useEffect(() => {
    // Firestore collecton reference
    const booksRef = collection(db, 'books');

    // Function to fetch the data from the books referenec
    getDocs(booksRef)
      .then((snapshot) => {
        // I have initialized an empty array
        let fetchedData = [];

        // Looping through the response data
        snapshot.docs.forEach((book) => {
          fetchedData.push({ ...book.data(), id: book.id });
        });

        // Finally added fetched data to the local state
        setBooks(fetchedData);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(books);

  return (
    <div className="App">
      <h1>Hello!</h1>
    </div>
  );
}

export default App;
