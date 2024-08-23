import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
    value: string;
    placeholder: string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, placeholder, label, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mb-4 relative">
            {label && <label className="block text-gray-400 text-sm font-bold mb-2">{label}</label>}
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="shadow appearance-none border border-transparent rounded py-2 px-3 bg-customGray
                    text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 w-full pr-10"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none"
                    style={{ height: '100%' }}
                >
                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
