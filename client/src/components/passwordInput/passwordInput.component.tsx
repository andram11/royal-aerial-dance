import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // You can use any icon library you prefer

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
        value={value}
        onChange={onChange}
        required
      />
      <span
        onClick={toggleVisibility}
        style={{ position: "relative", right: 0, top: 0, cursor: "pointer" }}
      >
        {isVisible ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};

export default PasswordInput;
