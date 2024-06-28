import { IonButton, setupIonicReact } from '@ionic/react'
import './Hero.css'

setupIonicReact();


function Contact() {

    return (
        <>
            <div className='title2 title3'>
                <h2>Contact Us</h2>
            </div>

            <div className="contactUs">


                <div className="textbox" >
                    <textarea placeholder='Write Something...'></textarea>

                    <input placeholder='Enter Email or Phone Number'/>

                    <IonButton className="ibuttons2">Send Message</IonButton>


                </div>


                <div className="vl"> </div>
                <div className="buttons2">
                    <IonButton className="ibuttons2">Whatsapp Us</IonButton>
                    <IonButton className="ibuttons2">Email us</IonButton>
                    <IonButton className="ibuttons2">Call Us </IonButton>
                </div>


            </div>


        </>
    )
}
export default Contact