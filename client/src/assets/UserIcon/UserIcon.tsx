
import React from 'react';
import styles from './UserIcon.module.css'

const SearchIcon: React.FC<{ onClick?: () => void }> = ({ onClick })  => {
  return (
    <div className={styles.iconContainer} onClick={onClick}>
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="#d496a7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 19.2857L15.8 21L20 17M4 21C4 17.134 7.13401 14 11 14C12.4872 14 13.8662 14.4638 15 15.2547M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
        stroke="#d496a7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    </div>
  );
};

export default SearchIcon;
