import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ConsultantCarousel from './Carousel';
import './BookAppointment.css'


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
        <><div className='title2 title3'>
        <h2>Consultants</h2>
    </div>
            <ConsultantCarousel category='physician'/>
            <ConsultantCarousel category='lifecoach'/>
        </>
    );
}

export default BookAppointment