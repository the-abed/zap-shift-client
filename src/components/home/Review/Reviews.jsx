import React, { use } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";



const Reviews = ({reviewsPromise}) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);
  return (
    <>
      <div className="my-10">
       <h2 className="text-3xl text-center font-bold text-secondary mb-3">
       What our customers say
       </h2>
       <p className="text-center text-gray-600 mb-5">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
       <Swiper
       loop={true}
       effect={'coverflow'}
       grabCursor={true}
       centeredSlides={true}
       slidesPerView={3}
       coverflowEffect={{
       rotate: 30,
       stretch: '50%',
       depth: 200,
       modifier: 1,
       scale: 0.75,
       slideShadows: true,
       }}
       autoplay={{
       delay: 2000,
       disableOnInteraction: false,
       }}
       
       modules={[EffectCoverflow,  Autoplay]}
       className="mySwiper"
       >
       {
       reviews.map((review, index) =>
       <SwiperSlide key={index}>
       <ReviewCard review={review}></ReviewCard>
       </SwiperSlide>
       )}
        
       </Swiper>
      </div>
    </>
  );
};

export default Reviews;
