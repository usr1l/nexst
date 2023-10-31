// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState<string>("");
  const [ username, setUsername ] = useState<string>("");
  const [ firstName, setFirstName ] = useState<string>("");
  const [ lastName, setLastName ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ confirmPassword, setConfirmPassword ] = useState<string>("");
  const [ errors, setErrors ] = useState<Record<string, string>>({});
  const { closeModal } = useModal();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (password === confirmPassword) {
    //   setErrors({});
    //   return dispatch(sessionActions.thunkSignup({ email, username, firstName, lastName, password }))
    //     .then(closeModal)
    //     .catch(async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors);
    //     });
    // }
    // return setErrors({ 'login': 'Confirm Password field must be the same as the Password field' });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {Object.entries(errors).map(([ err, errMsg ], idx) => <div>{err}: {errMsg}</div>)}
        </div>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
