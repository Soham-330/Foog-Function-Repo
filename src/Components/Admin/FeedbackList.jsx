import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, setupIonicReact } from '@ionic/react';
import { db } from "../../../firebase";

setupIonicReact();

const FeedbackList = () => {
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
        <IonCard key={index}>
          <IonCardHeader>
            <IonCardSubtitle>{`From ${feedback.numemail}`}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <h3>{feedback.text}</h3>
            <hr />
          </IonCardContent>
        </IonCard>
      ))}
    </div>
  );
};

export default FeedbackList;
