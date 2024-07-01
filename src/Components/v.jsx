import React, { useState } from 'react';

const InputValidator = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!(emailRegex.test(input) || phoneRegex.test(input))) {
      setMessage('Please enter a valid Email or Mobile number');
    }
    else {
        
    }

  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setMessage('');
  };

  return (
    <div>
      <h1>Input Validator</h1>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter email or mobile number"
      />
      <button onClick={validateInput}>Validate</button>
      <p>{message}</p>
    </div>
  );
};

export default InputValidator;