// components/Input.js
import React, { useState } from "react";

interface InputProps {
    value?: string;
    placeholder?: string;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const Input: React.FC<InputProps> = ({
    value = "",
    onChange,
    placeholder,
    className,
    type,
}) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="w-full">
            <input
                type={type}
                className={`w-full border ${className} searchInputBtn border rounded-[10px] p-[10px]`}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default Input;
