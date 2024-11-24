// InputField.js
import React from "react";

const InputField = ({ label, type, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="text-gray-500 text-xs">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-200 rounded focus:border-gray-300 focus:outline-none"
      />
    </div>
  );
};

export default InputField;
