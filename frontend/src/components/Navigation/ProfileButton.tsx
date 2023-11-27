// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { UserState } from "../../store/session";
import { useAppDispatch } from "../../store";
import "./Navigation.css"

function ProfileButton({ user }: { user: UserState }) {
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
      if (profileButtonRef.current) {
        if (!profileButtonRef.current.contains(e.target as Node)) {
          setShowMenu(false);
        }
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [ showMenu ]);

  // const logout = (e: MouseEvent) => {
  //   e.preventDefault();
  //   useAppDispatch(thunkLogout(null));
  // };

  const ulClassName = "nav-menu" + (showMenu ? "" : " hidden");
  console.log(ulClassName)
  return (
    <>
      <button
      ={openMenu}>
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      <div className={ulClassName} ref={profileButtonRef}>
        <div>{user.username}</div>
        <div>{user.firstname} {user.lastname}</div>
        <div>{user.email}</div>
        <div>
          <button>Log Out</button>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
