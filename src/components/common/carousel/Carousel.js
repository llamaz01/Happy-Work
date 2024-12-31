import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/pagination";

const Carousel = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 10000 }}
      loop
      spaceBetween={50}
      slidesPerView={1}
    >
  
      <SwiperSlide>
        <img src="/image/1.gif" alt="Slide 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/image/2.png" alt="Slide 3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
