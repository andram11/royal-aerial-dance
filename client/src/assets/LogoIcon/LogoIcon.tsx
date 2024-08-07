import React from "react";

const LogoIcon: React.FC = () => {
  return (
    <div>
      <svg
        width="90"
        height="90"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!-- Abstract and minimalistic crown with fluid lines --> */}
        <path
          d="M 75 200 Q 100 150, 125 200 T 175 200 T 225 200 Q 200 150, 175 200 T 125 200 T 75 200"
          fill="none"
          stroke="#5d576b"
          stroke-width="10"
        />
        {/* <!-- Small crown in the middle --> */}
        <polygon
          points="140,150 150,130 160,150 150,160"
          fill="none"
          stroke="#5d576b"
          stroke-width="4"
        />
        {/* <!-- Base of the crown --> */}
        <line
          x1="50"
          y1="200"
          x2="250"
          y2="200"
          stroke="5d576b"
          stroke-width="4"
        />
      </svg>
    </div>
  );
};

export default LogoIcon;
