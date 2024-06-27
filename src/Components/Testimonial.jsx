import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Testimonials() {

    return (
        <>
          
        
            <div className="title2">
                <h2>Testimonials</h2>
            </div>
            
            <Carousel>
        <div className="box2">
                    <div className="img2"></div>
                    <div className="text">

                        <div className="text1">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, delectus optio. Dolor deserunt unde veniam quis architecto ducimus vel consequuntur, dicta illum exercitationem sequi perspiciatis dolorum quod eveniet suscipit. Eum.
                            </p></div>
                        <div className="text2"><p>Lorem ipsum dolor sit amet</p></div>
                    </div>

                </div>
                <div className="box2">
                    <div className="img2"></div>
                    <div className="text">

                        <div className="text1">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, delectus optio. Dolor deserunt unde veniam quis architecto ducimus vel consequuntur, dicta illum exercitationem sequi perspiciatis dolorum quod eveniet suscipit. Eum.
                            </p></div>
                        <div className="text2"><p>Lorem ipsum dolor sit amet</p></div>
                    </div>

                </div>
                <div className="box2">
                    <div className="img2"></div>
                    <div className="text">

                        <div className="text1">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, delectus optio. Dolor deserunt unde veniam quis architecto ducimus vel consequuntur, dicta illum exercitationem sequi perspiciatis dolorum quod eveniet suscipit. Eum.
                            </p></div>
                        <div className="text2"><p>Lorem ipsum dolor sit amet</p></div>
                    </div>

                </div>
         </Carousel>
            
        </>
    )

}


export default Testimonials