'use client'

import { FC, useState } from "react";
import Modal from "../common/modal/Modal";
import LoginForm from "./LoginForm";

const UserHeaderMenu : FC = () => {
  const [isShown, setIsShown] = useState<boolean>(false); 

  return (
    <>
      <span
        role="button"
        tabIndex={-1}
        className=""
        onClick={() => setIsShown((prevState) => !prevState)}
      >
        LogIn
      </span>

      <Modal
        isShown={isShown}
        onClose={() => setIsShown(() => false)}
      >
        <LoginForm />
      </Modal>
    </>
  );
};

export default UserHeaderMenu;