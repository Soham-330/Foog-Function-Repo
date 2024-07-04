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
                    <div className="img2 j1"></div>
                    <div className="text">

                        <div className="text1">
                            <p>

                                FOOGFUNCTION has completely transformed my eating habits. The Paneer Tikka Salad is my absolute favorite—so fresh and flavorful. The personalized diet plans have helped me achieve my health goals. Highly recommend!
                            </p></div>
                        <div className="text2"><p>Rating: ★★★★★</p></div>
                    </div>

                </div>
                <div className="box2">
                    <div className="img2 j2"></div>
                    <div className="text">

                        <div className="text1">
                            <p>
                                I love the variety and taste of the vegetarian meals offered by FOOGFUNCTION. The Vegetable Pulao is a staple in my weekly diet now. The team's dedication to quality and nutrition is evident in every dish. Excellent service!
                            </p></div>
                        <div className="text2"><p>Rating: ★★★★★</p></div>
                    </div>

                </div>
                <div className="box2">
                    <div className="img2 j3"></div>
                    <div className="text">

                        <div className="text1">
                            <p>
                                The Masala Chana Chaat is a game-changer for quick, healthy snacks. The customer service is also very responsive and helpful. A fantastic option for anyone looking to eat healthy without compromising on taste.
                            </p></div>
                        <div className="text2"><p>Rating: ★★★★☆</p></div>
                    </div>

                </div>
            </Carousel>

        </>
    )

}


export default Testimonials