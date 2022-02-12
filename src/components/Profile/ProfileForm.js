import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

import classes from './ProfileForm.module.css';


// https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]

const ProfileForm = () => {
  const newPasswordInputref = useRef();
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const submithandler = event => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputref.current.value;
    // add validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDESsA2AZvRELJcWY5Moy5pZFX4ewuKwFQ', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // assume always succeeds!
      history.replace('/');
    })
  };
  return (
    <form className={classes.form} onSubmit={submithandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputref} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
