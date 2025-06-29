import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

import { Autoplay, FreeMode } from "swiper/modules";

// import logo from file
import logo1 from '../../assets/brands/amazon.png'
import logo2 from '../../assets/brands/amazon_vector.png'
import logo3 from '../../assets/brands/casio.png'
import logo4 from '../../assets/brands/moonstar.png'
import logo5 from '../../assets/brands/randstad.png'
import logo6 from '../../assets/brands/start-people 1.png'
import logo7 from '../../assets/brands/start.png'

// Example logos (use your own paths)
const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogoSlider = () => {
    return (
        <div className="my-20">
            <div>
                <h2 className="text-2xl font-bold text-center text-[#03373D]">
                    We've helped thousands of sales teams
                </h2>
            </div>
            <div className="py-10 bg-white">
                <Swiper
                    modules={[Autoplay, FreeMode]}
                    slidesPerView={4}
                    spaceBetween={30}
                    freeMode={true}
                    loop={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    speed={3000}
                    className="client-logo-swiper"
                >
                    {logos.concat(logos).map((logo, idx) => (
                        <SwiperSlide
                            key={idx}
                            className="flex justify-center items-center"
                        >
                            <img
                                src={logo}
                                alt={`logo-${idx}`}
                                className="h-6 w-auto object-contain"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ClientLogoSlider;
