// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useDispatch } from 'react-redux';
import { UserState } from "../../store/session";

function ProfileButton({ user }: { user: UserState }) {
  const dispatch = useDispatch();
  const [ showMenu, setShowMenu ] = useState<boolean>(false);
  // useRef expects null in typescript, not undefined
  const profileButtonRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e: MouseEvent) => {
      if (!profileButtonRef.current?.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [ showMenu ]);

  const logout = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(thunkLogout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={profileButtonRef}>
        <div>{user.username}</div>
        <div>{user.firstname} {user.lastname}</div>
        <div>{user.email}</div>
        <div>
          <button onClick={logout}>Log Out</button>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
