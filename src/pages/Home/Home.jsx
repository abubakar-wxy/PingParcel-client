import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import ClientLogoSlider from './ClientLogoSlider';
import ServiceFeatures from './ServiceFeatures';
import MerchantCTA from './MerchantCTA';
import FAQ from './FAQ';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Banner />
            <HowItWorks />
            <OurServices />
            <ClientLogoSlider />
            <ServiceFeatures />
            <MerchantCTA />
            <Testimonials/>
            <FAQ/>
        </div>
    );
};

export default Home;