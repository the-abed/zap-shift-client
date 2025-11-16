import React from "react";
import { ImOpt } from "react-icons/im";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerImg1 from "../assets/banner/banner1.png";
import bannerImg2 from "../assets/banner/banner2.png";
import bannerImg3 from "../assets/banner/banner3.png";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} interval={3000}>
      <div>
        <img src={bannerImg1} alt="" />
      </div>
      <div>
        <img src={bannerImg2} alt="" />
      </div>
      <div>
        <img src={bannerImg3} alt="" />
      </div>
    </Carousel>
  );
};

export default Banner;
