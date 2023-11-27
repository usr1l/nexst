import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import { RootState } from '../../store';
import { UserState } from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }: { isLoaded: boolean }) {
  const sessionUser: UserState = useSelector((state: RootState) => state.session.user);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <div>
  //       <ProfileButton user={sessionUser} />
  //     </div>
  //   );
  // } else {
  //   sessionLinks = (
  //     <div>
  //       <OpenModalButton
  //         buttonText="Log In"
  //         modalComponent={<LoginFormModal />}
  //       />
  //       <OpenModalButton
  //         buttonText="Sign Up"
  //         modalComponent={<SignupFormModal />}
  //       />
  //     </div>
  //   );
  // }

  // if you don't want the trailing "/", i.e. notes/ vs notes, use "end" in react v6
  // routes are exact by default
  return (
    <nav className='navigation'>
      <div>
        <NavLink to="/"><i className='fab fa-react logo' /></NavLink>
      </div>
      {isLoaded ? (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    ): (
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
    )}
    </nav>
  );
}

export default Navigation;
