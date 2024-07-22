// import { useEffect, useState } from "react";
// import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../../../firebase";
// import { format, addDays } from 'date-fns';
// import { IonAlert, IonItem, IonLabel, IonRadio, IonRadioGroup, IonDatetime, IonButton, setupIonicReact } from '@ionic/react';
// // import '@ionic/react/css/core.css';

// setupIonicReact();

// const Booking = (props) => {
//   const [date, setDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
//   const [unavailability, setUnavailability] = useState([]);
//   const [availability, setAvailability] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showAlert, setShowAlert] = useState(false);

//   const fetchUnavailability = async (selectedDate) => {
//     try {
//       const q = query(
//         collection(db, 'dietician_unavial'),
//         where('date', '==', selectedDate)
//       );
//       const snapshot = await getDocs(q);
//       const data = snapshot.docs.map(doc => doc.data());
//       setUnavailability(data);
//     } catch (error) {
//       console.error("Error fetching unavailability:", error);
//     }
//   };

//   const generateTimeSlots = (start, end, interval) => {
//     const slots = [];
//     let current = new Date(start);

//     while (current < end) {
//       const next = new Date(current.getTime() + interval);
//       slots.push({ start: new Date(current), end: new Date(next) });
//       current = next;
//     }

//     return slots;
//   };

//   const calculateAvailability = () => {
//     const startOfDay = new Date(`${date}T09:00:00`);
//     const endOfDay = new Date(`${date}T17:00:00`);
//     let availableSlots = generateTimeSlots(startOfDay, endOfDay, 30 * 60 * 1000);

//     if (unavailability.length === 0) {
//       setAvailability(availableSlots);
//       return;
//     }

//     unavailability.forEach(({ start, end }) => {
//       const startUnavailable = new Date(`${date}T${start}`);
//       const endUnavailable = new Date(`${date}T${end}`);
//       availableSlots = availableSlots.flatMap(slot => {
//         if (endUnavailable <= slot.start || startUnavailable >= slot.end) {
//           return [slot];
//         }
//         const newSlots = [];
//         if (startUnavailable > slot.start) {
//           newSlots.push({ start: slot.start, end: startUnavailable });
//         }
//         if (endUnavailable < slot.end) {
//           newSlots.push({ start: endUnavailable, end: slot.end });
//         }
//         return newSlots;
//       });
//     });

//     setAvailability(availableSlots);
//   };

//   const handleBookSlot = async () => {
//     if (selectedSlot) {
//       try {
//         await addDoc(collection(db, 'booked_slots'), {
//           date,
//           start: format(selectedSlot.start, 'HH:mm'),
//           end: format(selectedSlot.end, 'HH:mm'),
//           dietician_id: props.id,
//         });
//         await addDoc(collection(db, 'dietician_unavial'), {
//           date,
//           start: format(selectedSlot.start, 'HH:mm'),
//           end: format(selectedSlot.end, 'HH:mm')
//         });
//         alert("Slot booked successfully!");
//         setDate(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
//         setSelectedSlot(null);
//       } catch (error) {
//         console.error("Error booking slot:", error);
//         alert("Error booking slot. Please try again.");
//       }
//     }
//   };

//   const handleConfirm = () => {
//     setShowAlert(true);
//   };

//   const confirmBookSlot = () => {
//     handleBookSlot();
//     setShowAlert(false);
//   };

//   useEffect(() => {
//     if (date) {
//       fetchUnavailability(date);
//     }
//   }, [date]);

//   useEffect(() => {
//     if (date) {
//       if (unavailability.length > 0) {
//         calculateAvailability();
//       } else {
//         setAvailability(generateTimeSlots(new Date(`${date}T09:00:00`), new Date(`${date}T17:00:00`), 30 * 60 * 1000));
//       }
//     }
//   }, [unavailability, date]);

//   return (
//     <>
//       <h1>Dietician Availability</h1>
//       <IonDatetime
//         displayFormat="YYYY-MM-DD"
//         min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
//         value={date}
//         onIonChange={(e) => setDate(e.detail.value.split('T')[0])}
//         presentation="date"
//       />
//       {availability.length > 0 && (
//         <IonRadioGroup value={selectedSlot} onIonChange={(e) => setSelectedSlot(e.detail.value)}>
//           {availability.map((slot, index) => (
//             <IonItem key={index} className="radio-item" onClick={() => setSelectedSlot(slot)}>
//               <div className={`radio-label ${selectedSlot === slot ? 'selected' : ''}`}>
//                 {format(slot.start, 'HH:mm')} - {format(slot.end, 'HH:mm')}
//                 <input
//                   type="radio"
//                   className="radio-input"
//                   name="slot"
//                   value={index}
//                   checked={selectedSlot === slot}
//                   readOnly
//                 />
//               </div>
//             </IonItem>
//           ))}
//         </IonRadioGroup>
//       )}
//       {selectedSlot && (
//         <IonButton onClick={handleConfirm} style={{ marginTop: '20px' }}>Book Slot</IonButton>
//       )}
//       <IonAlert
//         isOpen={showAlert}
//         onDidDismiss={() => setShowAlert(false)}
//         header={'Confirm Booking'}
//         message={`Date: ${format(date, 'dd-MM-yyyy')} Time Slot: ${selectedSlot ? format(selectedSlot.start, 'HH:mm') : ''} - ${selectedSlot ? format(selectedSlot.end, 'HH:mm') : ''}`}
//         buttons={[
//           {
//             text: 'Cancel',
//             role: 'cancel',
//             handler: () => setShowAlert(false)
//           },
//           {
//             text: 'Confirm',
//             handler: confirmBookSlot
//           }
//         ]}
//       />
//     </>

//   );
// };

// export default Booking

import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { Link, useParams } from "react-router-dom";
import { format, addDays } from 'date-fns';
import { IonAlert, IonItem, IonRadioGroup, IonDatetime, IonButton, setupIonicReact } from '@ionic/react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

setupIonicReact();

const Booking = (props) => {
  const [date, setDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [unavailability, setUnavailability] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [consultant, setConsultant] = useState(null);

  const { id } = useParams();
  // User details begin
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateMobileNumber = (number) => /^[0-9]{10}$/.test(number);
  const validateAge = (age) => !isNaN(parseInt(age, 10)) && parseInt(age, 10) >= 1 && parseInt(age, 10) <= 100;
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !validateMobileNumber(mobileNumber) || !validateAge(age) || !gender || !validateEmail(email)) {
      setError('Please fill in all fields correctly');
      return;
    }

    try {
      await addDoc(collection(db, 'booked_slots'), {
        name,
        mobileNumber,
        age: parseInt(age, 10),
        gender,
        email,
        date,
        start: format(selectedSlot.start, 'HH:mm'),
        end: format(selectedSlot.end, 'HH:mm'),
        dieticianId: id,
        isCompleted: false,
      });

      await addDoc(collection(db, 'dietician_unavail'), {
        date,
        start: format(selectedSlot.start, 'HH:mm'),
        end: format(selectedSlot.end, 'HH:mm'),
        dieticianId: id,
      });

      // alert("Slot booked successfully!");
      setDate(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
      setSelectedSlot(null);
      alert('');
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

  const fetchUnavailability = async (selectedDate) => {
    try {
      const q = query(
        collection(db, 'dietician_unavail'),
        where('date', '==', selectedDate),
        where('dieticianId', '==', id),
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setUnavailability(data);
    } catch (error) {
      console.error("Error fetching unavailability:", error);
    }
  };

  const fetchConsultant = async () => {
    try {
      const docRef = doc(db, 'dietician', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setConsultant({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching consultant:", error);
    }
  };

  const generateTimeSlots = (start, end, interval) => {
    const slots = [];
    let current = new Date(start);

    while (current < end) {
      const next = new Date(current.getTime() + interval);
      slots.push({ start: new Date(current), end: new Date(next) });
      current = next;
    }

    return slots;
  };

  const calculateAvailability = () => {
    const startOfDay = new Date(`${date}T09:00:00`);
    const endOfDay = new Date(`${date}T17:00:00`);
    let availableSlots = generateTimeSlots(startOfDay, endOfDay, 30 * 60 * 1000);

    if (unavailability.length === 0) {
      setAvailability(availableSlots);
      return;
    }

    unavailability.forEach(({ start, end }) => {
      const startUnavailable = new Date(`${date}T${start}`);
      const endUnavailable = new Date(`${date}T${end}`);
      availableSlots = availableSlots.flatMap(slot => {
        if (endUnavailable <= slot.start || startUnavailable >= slot.end) {
          return [slot];
        }
        const newSlots = [];
        if (startUnavailable > slot.start) {
          newSlots.push({ start: slot.start, end: startUnavailable });
        }
        if (endUnavailable < slot.end) {
          newSlots.push({ start: endUnavailable, end: slot.end });
        }
        return newSlots;
      });
    });

    setAvailability(availableSlots);
  };

  const handleConfirm = () => {
    setShowAlert(true);
  };

  const confirmBookSlot = () => {
    handleSubmit();
    setShowAlert(false);
  };

  useEffect(() => {
    if (date) {
      fetchUnavailability(date);
    }
  }, [date]);

  useEffect(() => {
    if (date) {
      if (unavailability.length > 0) {
        calculateAvailability();
      } else {
        setAvailability(generateTimeSlots(new Date(`${date}T09:00:00`), new Date(`${date}T17:00:00`), 30 * 60 * 1000));
      }
    }
  }, [unavailability, date]);

  useEffect(() => {
    fetchConsultant();
  }, []);

  return (
    <>
      <div className="title2 title3">
        <h2>Dietician Availability</h2>
      </div>
      <div className="bookingPage">
        {consultant && (
          <div className="appointment-body">
            <div className="container">
              <div className="description">
                <h2 className='heading'>{consultant.category.toUpperCase()} SERVICES</h2>
                {(consultant.category === 'physician') ? 
                  <p>Book a one-on-one consultation with a certified dietician to discuss your dietary needs and health goals. Our consultants provide personalized advice, meal planning, and practical strategies to help you achieve better health.</p> : 
                  <p>Schedule a session with a certified life coach to help you identify and achieve your personal and professional goals. Our life coaches provide personalized strategies and support to help you unlock your potential and live a more fulfilling life.</p>}
                <div>
                  <b>Benefits:</b>
                  <ul>{(consultant.category === 'physician') ?
                    <>
                      <li>Tailored Guidance: Customized nutrition plans based on your lifestyle and goals.</li>
                      <li>Expert Support: Professional advice from certified consultants.</li>
                      <li>Health Monitoring: Regular follow-ups to track and adjust your progress.</li>
                      <li>Convenience: In-person or virtual appointments to fit your schedule.</li>
                    </> :
                    <>
                      <li>Tailored Guidance: Personalized strategies to achieve your personal and professional goals.</li>
                      <li>Expert Support: Professional advice from certified life coaches.</li>
                      <li>Goal Setting: Help in identifying and setting achievable goals.</li>
                      <li>Convenience: In-person or virtual appointments to fit your schedule.</li>
                    </>
                  }
                  </ul>
                </div>
              </div>
              <div className="carousel">
                  <div className='doc-carousel'>
                    <img src={consultant.image} alt={`Dietician ${consultant.name}`} />
                    <h3>{consultant.name}</h3>
                    <ul>
                      {Array.isArray(consultant.credentials) ? (
                        consultant.credentials.map((credential, credIndex) => (
                          <li key={credIndex}>{credential}</li>
                        ))
                      ) : (<li>No credentials available</li>)}
                    </ul>
                    <h3 className='price'>{`Price: Rs ${consultant.fees}`}</h3>
                    <h3 className='duration'>Duration: 30 mins</h3>
                  </div>
              </div>  
            </div>
          </div>
        )}
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="section">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="section">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              id="mobileNumber"
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div className="section">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="section">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="section">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="section">
            <IonDatetime
              displayFormat="YYYY-MM-DD"
              min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
              value={date}
              onIonChange={e => setDate(e.detail.value)}
            ></IonDatetime>
          </div>

          <IonRadioGroup value={selectedSlot} onIonChange={e => setSelectedSlot(e.detail.value)}>
            {availability.map((slot, index) => (
              <IonItem key={index}>
                <input
                  type="radio"
                  value={slot}
                  checked={selectedSlot === slot}
                  onChange={() => setSelectedSlot(slot)}
                />
                <label>{`${format(slot.start, 'HH:mm')} - ${format(slot.end, 'HH:mm')}`}</label>
              </IonItem>
            ))}
          </IonRadioGroup>

          <div className="section">
            <IonButton type="submit" disabled={!selectedSlot} onClick={handleConfirm}>Book Slot</IonButton>
          </div>
        </form>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Confirm Booking'}
          message={'Do you want to confirm the booking?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Confirm Cancel');
              }
            },
            {
              text: 'Confirm',
              handler: confirmBookSlot
            }
          ]}
        />
      </div>
    </>
  );
};

export default Booking;
