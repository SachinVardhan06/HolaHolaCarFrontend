import React from 'react';

const Button = ({ label, onClick, style, className }) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={className}
    >
      {label}
    </button>
  );
};

export default Button;
