import './ContactUs.css'
function ContactUs(){

    return(
        <>
        <div className="container">
            <div className="heading">
                <h2>Contact Us</h2>
            </div>
            <div className="contact-options">
                <div id="wrapper-1">
                    <textarea name="" id="" placeholder='Write Us...' className='text-us'></textarea>
                    <div className="send">
                        <button className='send-btn'>Send Message</button>
                    </div>
                </div>
                <hr />
                {/* <div className="divider"></div> */}
                <div id="wrapper-2">
                    <button className='whatsapp-btn contact-btn'>Whatsapp Us</button>
                    <button className='email-btn contact-btn'>Email Us</button>
                    <button className='call-btn contact-btn'>Call Us</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default ContactUs