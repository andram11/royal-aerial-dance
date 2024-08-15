import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // You can use any icon library you prefer
import styles from './passwordInput.module.css'

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ position: "relative" }}>
      <label>{label}</label>
      <input
        type={isVisible ? "text" : "password"}
        name= "password"
        value={value}
        onChange={onChange}
        required
        className={styles.input}
      />
      <span
        onClick={toggleVisibility}
        style={{ position: "absolute", right: 5, top: 15, bottom: 0, cursor: "pointer"}}
      >
        {isVisible ? <FaEye style={{opacity: 0.3}}/> : <FaEyeSlash style={{opacity: 0.3}} />}
      </span>
    </div>
  );
};

export default PasswordInput;
