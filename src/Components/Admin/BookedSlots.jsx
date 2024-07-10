import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc  } from 'firebase/firestore';

const DieticianSlotManager = () => {
  const [dieticians, setDieticians] = useState([]);
  const [selectedDietician, setSelectedDietician] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showAllSlots, setShowAllSlots] = useState(true);
  const [showCompletedSlots, setShowCompletedSlots] = useState(false);

  useEffect(() => {
    const fetchDieticians = async () => {
      const dieticiansCol = collection(db, 'dietician');
      const dieticiansSnapshot = await getDocs(dieticiansCol);
      setDieticians(dieticiansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchDieticians();
  }, []);

  useEffect(() => {
    if (selectedDietician) {
      fetchBookedSlots();
    } else {
      setBookedSlots([]);
    }
  }, [selectedDietician, showAllSlots, showCompletedSlots]);

  const fetchBookedSlots = async () => {
    const slotsCol = collection(db, 'booked_slots');
    let q = query(slotsCol, where('dieticianId', '==', selectedDietician), where('isCompleted', '==', showCompletedSlots));

    if (!showAllSlots) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      q = query(q, where('date', '>=', today.toISOString().split('T')[0]));
    }

    const slotsSnapshot = await getDocs(q);
    setBookedSlots(slotsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDieticianChange = (event) => {
    setSelectedDietician(event.target.value);
  };

  const handleDeleteSlot = async (slotId) => {
    const confirm = window.confirm("Are you sure you want to delete this slot?");
    if (confirm) {
      const slotDoc = doc(db, 'booked_slots', slotId);
      await deleteDoc(slotDoc);
      setBookedSlots(bookedSlots.filter(slot => slot.id !== slotId));
    }
  };

  const handleCompleteSlot = async (slotId,currentStatus) => {
    const slotDoc = doc(db, 'booked_slots', slotId);
    await updateDoc(slotDoc, { isCompleted: !currentStatus });
    console.log(currentStatus);
    setBookedSlots(bookedSlots.filter(slot => slot.id !== slotId));
  };

  const handleRescheduleSlot = async (slotId) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    const newStart = prompt("Enter new start time (HH:MM) 24Hour Format:");
    const newEnd = prompt("Enter new end time (HH:MM) 24Hour Format:");
    if (newDate && newStart && newEnd) {
      const slotDoc = doc(db, 'booked_slots', slotId);
      await updateDoc(slotDoc, { date: newDate, start: newStart, end: newEnd });
      fetchBookedSlots();
    }
  };

  const toggleSlotView = () => {
    setShowAllSlots(!showAllSlots);
  };

  const toggleCompletedSlotsView = () => {
    setShowCompletedSlots(!showCompletedSlots);
  };

  return (
    <div>
      <h2>Select a Dietician</h2>
      <select value={selectedDietician} onChange={handleDieticianChange}>
        <option value="">Select a Dietician</option>
        {dieticians.map(dietician => (
          <option key={dietician.id} value={dietician.id}>
            {dietician.name}
          </option>
        ))}
      </select>

      {selectedDietician && (
        <div>
          <button onClick={toggleSlotView}>
            {showAllSlots ? 'Show Today and Future Slots' : 'Show All Slots'}
          </button>
          <button onClick={toggleCompletedSlotsView}>
            {showCompletedSlots ? 'Show Incomplete Slots' : 'Show Completed Slots'}
          </button>
          <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid black', marginTop: '10px', padding: '10px' }}>
            <h3>Booked Slots</h3>
            <ul>
              {bookedSlots.map(slot => (
                <li key={slot.id}>
                  {slot.date} - {slot.start} to {slot.end}
                  <p>{`Name: ${slot.name}, Mobile Number: ${slot.mobileNumber}, Email: ${slot.email}`}</p>
                  <p>{`Age: ${slot.age}, Gender: ${slot.gender}`}</p>
                  <button onClick={() => handleCompleteSlot(slot.id, slot.isCompleted)}>
                    {slot.isCompleted ? 'Mark as Incomplete' : 'Complete Slot'}
                  </button>
                  <button onClick={() => handleDeleteSlot(slot.id)}>Delete Slot</button>
                  <button onClick={() => handleRescheduleSlot(slot.id)}>Reschedule Slot</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DieticianSlotManager;