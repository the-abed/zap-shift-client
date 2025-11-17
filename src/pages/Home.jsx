import React from 'react';
import Banner from '../../src/components/Banner';
import HowItWorks from '../../src/components/home/HowItWorks';
import OurServices from '../../src/components/home/OurServices';
import Reviews from '../../src/components/home/Review/Reviews';
import Brands from '../../src/components/home/Brands';

const reviewsPromise = fetch('./reviews.json').then((res) => res.json());


const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brands></Brands>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </div>
    );
};

export default Home;