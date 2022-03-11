import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Authentication = ({ auth, setUser }) => {
  const initialState = { email: '', password: '', passwordConfirm: '' };
  const [formData, setFormData] = useState(initialState);
  const [isLogin, setIsLogin] = useState(false);

  const { email, password, passwordConfirm } = formData;

  // Functions
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submitting the form
  const onSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((credential) => {
          setUser(credential.user);

          // dummy stuff
          console.log('login credentials: ', credential.user);
          setFormData(initialState);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (!isLogin) {
      if (password !== passwordConfirm) {
        console.log('❌ Passwords must match!');
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => {
          setUser(credential.user);

          // dummy stuff
          console.log('sign up credentials: ', credential.user);
          setFormData(initialState);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setFormData(initialState);
  }, [isLogin]);

  return (
    <>
      <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Change to Sign Up' : 'Change to Login'}
      </button>

      <br />

      <form onSubmit={onSubmit}>
        <label htmlFor="email">
          <small>Email: </small>
          <input
            type="email"
            value={email}
            id="email"
            name="email"
            onChange={onChange}
            required
          />
        </label>

        <br />

        <label htmlFor="password">
          <small>Password: </small>
          <input
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={onChange}
            required
          />
        </label>

        <br />

        {!isLogin && (
          <label htmlFor="passwordConfirm">
            <small>Confirm password: </small>
            <input
              type="password"
              value={passwordConfirm}
              id="passwordConfirm"
              name="passwordConfirm"
              onChange={onChange}
              required
            />
          </label>
        )}

        <br />

        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
    </>
  );
};

export default Authentication;
