
import React from 'react';
import styles from './button.module.css'

interface ButtonProps {
    onClick?: () => void;
    text: string;
    type?: 'submit' | 'reset' | 'button'; 
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, type, disabled})  => {
  return (
    <button type= {type} onClick={onClick} className={styles.baseButton} disabled={disabled}>{text}</button>
  );
};

export default Button;
