import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Config/FirebaseConfig";
import { useState } from "react";

const AdminAvailability = () => {
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleAddUnavailability = async () => {
    if (!date || !start || !end) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'dietician_unavial'), {
        date,
        start,
        end
      });
      alert('Unavailability slot added successfully!');
      setDate('');
      setStart('');
      setEnd('');
    } catch (error) {
      console.error("Error adding unavailability:", error);
      alert('Error adding unavailability. Please try again.');
    }
  };

  return (
    <div>
      <h1>Admin: Add Unavailability</h1>
      <div>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Start Time:
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          End Time:
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleAddUnavailability}>Add Unavailability</button>
    </div>
  );
};

export default AdminAvailability;