import { IonButton, setupIonicReact } from '@ionic/react';
import './BookAppointment.css'
setupIonicReact();
import { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import ConsultantCarousel from './Carousel';

function BookAppointment(props) {
    let dieticianInfo = {
        dietDes : "Book a one-on-one consultation with a certified dietician to discuss your dietary needs and health goals. Our consultants provide personalized advice, meal planning, and practical strategies to help you achieve better health.",
        dietCred : [
            'Tailored Guidance: Customized nutrition plans based on your lifestyle and goals.',
            'Expert Support: Professional advice from certified consultants.',
            'Health Monitoring: Regular follow-ups to track and adjust your progress.',
            'Convenience: In-person or virtual appointments to fit your schedule.',
        ],
    };

    return (
        <>
            <ConsultantCarousel category='physician'/>
            <ConsultantCarousel category='lifecoach'/>
        </>
    );
}

export default BookAppointment