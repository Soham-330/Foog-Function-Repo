import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { Timestamp } from "firebase/firestore";

function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            const feedbacksCollection = collection(db, "feedback");
            const feedbackSnapshot = await getDocs(feedbacksCollection);
            const feedbackList = feedbackSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp instanceof Timestamp ? data.timestamp : Timestamp.fromDate(new Date(data.timestamp))
                };
            });
            feedbackList.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());

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
                        <p>{`${feedback.timestamp.toDate().toLocaleString()}`}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default FeedbackList;
