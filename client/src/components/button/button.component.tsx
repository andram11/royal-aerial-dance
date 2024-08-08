
import React from 'react';
import styles from './button.module.css'

interface ButtonProps {
    onClick: () => void;
    text: string
}

const Button: React.FC<ButtonProps> = ({ onClick, text })  => {
  return (
    <button onClick={onClick} className={styles.baseButton}>{text}</button>
  );
};

export default Button;
