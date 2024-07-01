import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import './admin.css'
function AdminPrompt() {

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            const feedbacksCollection = collection(db, "feedback");
            const feedbackSnapshot = await getDocs(feedbacksCollection);
            const feedbackList = feedbackSnapshot.docs.map(doc => doc.data());
            setFeedbacks(feedbackList);
        };

        fetchFeedbacks();
    }, []);

    return (
        <>
            <div className='title2 title3'>
                <h2>Feedbacks</h2>
            </div>
            <div className="feedbacks">
                {feedbacks.map((feedback, index) => (
                    <div key={index} className="adminFeedback">
                        <h4>{`From ${feedback.numemail}`}</h4>
                        <p>{feedback.text}</p>
                    </div>
                ))}
            </div>
        </>

    );
}

export default AdminPrompt