import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";

function AdminPrompt(){

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
        <div>
        {feedbacks.map((feedback, index) => (
            <div key={index}>
            <p>{`From ${feedback.numemail}`}</p>
            <h3>{feedback.text}</h3>
            <hr />
            </div>
        ))}
        </div>
    );
}

export default AdminPrompt