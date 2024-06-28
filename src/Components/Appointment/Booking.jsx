import { useEffect, useState } from "react";
import { db } from "../../Config/FirebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";


const Availability = () => {
  const [date, setDate] = useState('');
  const [unavailability, setUnavailability] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const fetchUnavailability = async (selectedDate) => {
    try {
      const q = query(
        collection(db, 'dietician_unavial'),
        where('date', '==', selectedDate)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setUnavailability(data);
    } catch (error) {
      console.error("Error fetching unavailability:", error);
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

    unavailability.forEach(({ start, end }) => {
      const startUnavailable = new Date(`${date}T${start}`);
      const endUnavailable = new Date(`${date}T${end}`);
      availableSlots = availableSlots.filter(slot => {
        return endUnavailable <= slot.start || startUnavailable >= slot.end;
      });
    });

    setAvailability(availableSlots);
  };

  const handleBookSlot = async () => {
    if (selectedSlot) {
      try {
        await addDoc(collection(db, 'booked_slots'), {
          date,
          start: selectedSlot.start.toISOString().split('T')[1].substring(0, 5),
          end: selectedSlot.end.toISOString().split('T')[1].substring(0, 5)
        });
        await addDoc(collection(db, 'dietician_unavial'), {
          date,
          start: selectedSlot.start.toISOString().split('T')[1].substring(0, 5),
          end: selectedSlot.end.toISOString().split('T')[1].substring(0, 5)
        });
        alert("Slot booked successfully!");
      } catch (error) {
        console.error("Error booking slot:", error);
      }
    }
  };

  useEffect(() => {
    if (date) {
      fetchUnavailability(date);
    }
  }, [date]);

  useEffect(() => {
    if (unavailability.length > 0) {
      calculateAvailability();
    }
  }, [unavailability]);

  return (
    <div>
      <h1>Dietician Availability</h1>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {availability.length > 0 && (
        <ul>
          {availability.map((slot, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  name="slot"
                  value={index}
                  onChange={() => setSelectedSlot(slot)}
                />
                {slot.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {slot.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </label>
            </li>
          ))}
        </ul>
      )}
      {selectedSlot && (
        <button onClick={handleBookSlot}>Book Slot</button>
      )}
    </div>
  );
};



export default Availability