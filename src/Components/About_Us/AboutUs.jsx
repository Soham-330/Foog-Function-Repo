import { setupIonicReact } from '@ionic/react';
import './AboutUs.css'
setupIonicReact();

function AboutUs(){
    return(
        <>
        <div className="about-us">
            <div className="heading-about">
                <h2>About Us</h2>
            </div>
            <div className="row-odd">
                <div className="image-about">
                    <img src="https://images.unsplash.com/photo-1506057213367-028a17ec52e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D" height="200px" width="200px" />
                </div>
                <div className="content">
                    <h2 className='product-disc-heading'>Heading</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, a odit minus delectus fugiat voluptates qui, amet, ad ducimus harum est eum ex. Iste esse tenetur ratione, necessitatibus itaque exercitationem!
                    Suscipit molestias rem reprehenderit, nam commodi dolor facere culpa atque velit sapiente, nostrum, blanditiis eveniet dignissimos? Itaque, nostrum nobis nam accusantium nesciunt, eveniet excepturi totam quibusdam numquam quidem corporis harum.</p>
                </div>
            </div>
            <div className="row-even">
                <div className="image-about">
                    <img src="https://images.unsplash.com/photo-1506057213367-028a17ec52e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D" height="200px" width="200px" />
                </div>
                <div className="content">
                    <h2 className='product-disc-heading'>Heading</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, a odit minus delectus fugiat voluptates qui, amet, ad ducimus harum est eum ex. Iste esse tenetur ratione, necessitatibus itaque exercitationem!
                    Suscipit molestias rem reprehenderit, nam commodi dolor facere culpa atque velit sapiente, nostrum, blanditiis eveniet dignissimos? Itaque, nostrum nobis nam accusantium nesciunt, eveniet excepturi totam quibusdam numquam quidem corporis harum.</p>
                </div>
            </div>
            <div className="row-odd">
                <div className="image-about">
                    <img src="https://images.unsplash.com/photo-1506057213367-028a17ec52e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D" height="200px" width="200px" />
                </div>
                <div className="content">
                    <h2 className='product-disc-heading'>Heading</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, a odit minus delectus fugiat voluptates qui, amet, ad ducimus harum est eum ex. Iste esse tenetur ratione, necessitatibus itaque exercitationem!
                    Suscipit molestias rem reprehenderit, nam commodi dolor facere culpa atque velit sapiente, nostrum, blanditiis eveniet dignissimos? Itaque, nostrum nobis nam accusantium nesciunt, eveniet excepturi totam quibusdam numquam quidem corporis harum.</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default AboutUs