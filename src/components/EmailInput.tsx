import React from 'react';


interface EmailInputProps{
  value: string;
  onChange:(Event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?:string;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, placeholder, label }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-400 text-sm font-bold mb-2">{label}</label>}
      <input
        type="email"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow appearance-none border border-transparent rounded py-2 px-3 bg-customGray
      text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500 w-full pr-10"
      />
    </div>
  );
};

export default EmailInput;
