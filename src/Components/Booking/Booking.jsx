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

  const handleSubmit = async () => {
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
        timestamp: new Date(),
      });

      await addDoc(collection(db, 'dietician_unavail'), {
        date,
        start: format(selectedSlot.start, 'HH:mm'),
        end: format(selectedSlot.end, 'HH:mm'),
        dieticianId: id,
      });

      alert("Slot booked successfully!");
      setDate(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
      setSelectedSlot(null);
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
        <h2>Consultant Booking Page</h2>
      </div>

      <div className="bookingPage">
        <div className="bookingTop">
          <div className="bookingDoc">
            {consultant && (
              <div className="bookingCard ">
                <img src={consultant.image} alt={`Dietician ${consultant.name}`} />
                <p>
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
                </p>
              </div>
            )}

          </div>
          <div className="bookingCalender">
            <IonDatetime
              color="new"
              displayFormat="YYYY-MM-DD"
              min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
              value={date}
              onIonChange={(e) => setDate(e.detail.value.split('T')[0])}
              presentation="date"
              className="date-time"
              max={format(addDays(new Date(), 365), 'yyyy-MM-dd')}
            />
          </div>

          <div className="bookingSlots">
            {availability.length > 0 && (
              <div className="bookingSlots">
                {availability.map((slot, index) => (
                  <button
                    key={index}
                    className={`radio-item ${selectedSlot === slot ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSlot(slot);
                    }}
                  >
                    <div className={`radio-label ${selectedSlot === slot ? 'selected' : ''}`}>
                      {format(slot.start, 'HH:mm')} - {format(slot.end, 'HH:mm')}
                      <input
                        type="radio"
                        className="radio-input"
                        name="slot"
                        value={index}
                        checked={selectedSlot === slot}
                        readOnly
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
  
        <div className="bookingForm">
          <form onSubmit={handleSubmit}>
          <h2>Fill the form please</h2>
            <div className="section">
              <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              </div>
              <div className="field">
               <label htmlFor="age">Age</label>
              <input
                id="age"
                placeholder="Age"
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              </div>
                <div className="field">
               <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              </div>
            </div>

            <div className="section">
              <div className="field">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                id="mobileNumber"
                placeholder="Enter your Mobile Number"
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              </div>
              <div className="field">
               <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="Enter your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              </div>
            </div>

              <IonButton className="bookBtn ibutton" type="button" disabled={!selectedSlot} onClick={handleConfirm}>Book Slot</IonButton>
  
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
      </div>
    </>
  );
};

export default Booking;