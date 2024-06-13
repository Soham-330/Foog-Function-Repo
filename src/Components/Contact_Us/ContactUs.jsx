import { setupIonicReact , IonButton } from '@ionic/react';
import './ContactUs.css'

setupIonicReact();
function ContactUs(){

    return(
        <>
        <div className="contact-container">
            <div className="heading">
                <h2>Contact Us</h2>
            </div>
            <div className="contact-options">
                <div id="wrapper-1">
                    <textarea name="" id="" placeholder='Write Us...' className='text-us'></textarea>
                    <div className="send">
                        <IonButton className='send-btn'>Send Message</IonButton>
                    </div>
                </div>
                <hr />
                {/* <div className="divider"></div> */}
                <div id="wrapper-2">
                    <IonButton size='large' className='whatsapp-btn contact-btn'>Whatsapp Us</IonButton>
                    <IonButton size='large' className='email-btn contact-btn'>Email Us</IonButton>
                    <IonButton size='large' className='call-btn contact-btn'>Call Us</IonButton>
                </div>
            </div>
        </div>
        </>
    );
}

export default ContactUs