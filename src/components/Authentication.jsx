import { useState } from 'react';

const Authentication = () => {
  const initialState = { name: '', password: '', passwordConfirm: '' };
  const [formData, setFormData] = useState(initialState);
  const [isLogin, setIsLogin] = useState(false);

  const { name, password, passwordConfirm } = formData;

  // Functions
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submitting the form
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Change to Sign Up' : 'Change to Sign Up'}
      </button>

      <br />

      <form>
        <label htmlFor="name">
          <small>Name: </small>
          <input
            type="text"
            value={name}
            id="name"
            name="name"
            onChange={onChange}
            required
          />
        </label>

        <br />

        <label htmlFor="password">
          <small>Password: </small>
          <input
            type="text"
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
              type="text"
              value={passwordConfirm}
              id="passwordConfirm"
              name="passwordConfirm"
              onChange={onChange}
              required
            />
          </label>
        )}

        <br />

        <button type="submit" onSubmit={onSubmit}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </>
  );
};

export default Authentication;
