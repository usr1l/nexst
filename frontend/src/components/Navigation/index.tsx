import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import { IRootState } from '../../store';
import { User } from '../../../../backend/models/User';
import './Navigation.css';

function Navigation({ isLoaded }: { isLoaded: boolean }) {
  const sessionUser: User = useSelector((state: IRootState) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    );
  }

  // if you don't want the trailing "/", i.e. notes/ vs notes, use "end" in react v6
  return (
    <div>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
