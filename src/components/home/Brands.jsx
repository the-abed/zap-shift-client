import React from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import amazon from "../../assets/brands/amazon.png";
import casio from "../../assets/brands/casio.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import star from "../../assets/brands/star.png";
import start_people from "../../assets/brands/start_people.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const brands = [amazon, casio, moonstar, randstad, star, start_people];

const Brands = () => {
  return (
    <>
    <h2 className="text-2xl text-center font-bold text-secondary my-5"> Brands we work with</h2>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <img src={brand} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Brands;
