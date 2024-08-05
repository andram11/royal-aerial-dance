import styles from "./userForm.module.css";
import { useState } from "react";

import PasswordInput from "../passwordInput/passwordInput.component";

interface UserFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
}

const UserForm: React.FC<UserFormProps> = ({
  handleSubmit,
  handleChange,
  buttonText,
}) => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    handleChange(e);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label htmlFor="username">Email:</label>
        <input
          type="email"
          id="username"
          name="username"
          required
          onChange={handleChange}
        ></input>

        <PasswordInput
          label="Password:"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
};

export default UserForm;
