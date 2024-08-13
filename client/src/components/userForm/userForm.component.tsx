import styles from "./userForm.module.css";
import { useState } from "react";
import Button from "../button/button.component";

import PasswordInput from "../passwordInput/passwordInput.component";

interface UserFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  formData: { username: string; password: string };
}

const UserForm: React.FC<UserFormProps> = ({
  handleSubmit,
  handleChange,
  buttonText,
  formData
}) => {
 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Email:</label>
        <input
          type="email"
          id="username"
          name="username"
          value={formData.username}
          required
          onChange={handleChange}
        />

        <PasswordInput
          label="Password:"
          value={formData.password}
          onChange={handleChange}
        />
        <div className={styles.buttonsContainer}>
          <Button text={buttonText} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
