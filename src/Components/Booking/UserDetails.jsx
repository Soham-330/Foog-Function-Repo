import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { IonButton, setupIonicReact } from '@ionic/react';
import { db } from '../../../firebase';
setupIonicReact();

const UserDetailsForm = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateMobileNumber = (number) => {
    // Validate mobile number: should be exactly 10 digits
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

  const validateAge = (age) => {
    // Validate age: should be a number between 1 and 100
    const parsedAge = parseInt(age, 10);
    return !isNaN(parsedAge) && parsedAge >= 1 && parsedAge <= 100;
  };

  const validateEmail = (email) => {
    // Validate email format using a basic regex pattern
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!name || !validateMobileNumber(mobileNumber) || !validateAge(age) || !gender || !validateEmail(email)) {
      setError('Please fill in all fields correctly');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'booked_slots'), {
        name,
        mobileNumber,
        age: parseInt(age, 10),
        gender,
        email,
      });
    //   console.log('Document written with ID: ', docRef.id);
      setName('');
      setMobileNumber('');
      setAge('');
      setGender('');
      setEmail('');
      setError('');
    } catch (error) {
      console.error('Error adding document: ', error);
      setError('Error adding document');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Mobile Number:</label>
        <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
      </div>
      <div>
        <label>Age:</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <IonButton type="submit">Submit</IonButton>
    </form>
  );
};

export default UserDetailsForm;
