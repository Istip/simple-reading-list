import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const AddBook = () => {
  const initialState = { author: '', title: '' };

  const [formData, setFormData] = useState(initialState);

  const { author, title } = formData;

  // Firestore collecton reference
  const booksRef = collection(db, 'books');

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Adding the document to the collection
    addDoc(booksRef, formData)
      .then(() => {
        console.log('Form submitted with data: ', formData);
        // Resetting the input values to be empty again
        setFormData(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h3>Add a new Book</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="author">
          <small>Author: </small>
          <input
            type="text"
            value={author}
            id="author"
            name="author"
            onChange={onChange}
            required
          />
        </label>

        <br />

        <label htmlFor="title">
          <small>Title: </small>
          <input
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={onChange}
            required
          />
        </label>

        <br />

        <button type="submit">Add book</button>
      </form>
    </>
  );
};

export default AddBook;
