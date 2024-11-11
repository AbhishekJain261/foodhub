// components/Input.js
import React, { useState } from "react";

interface InputProps {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  value = "",
  onChange,
  placeholder,
  className,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div>
      <input
        type="text"
        className={`w-full border ${className}`}
        style={{border: '1px solid', borderRadius: '10px',padding: '10px'}}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
