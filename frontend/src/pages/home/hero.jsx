import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between text-center md:gap-14 gap-8'>
      <div className='md:w-1/2 w-full items-center'>
        <h1 className='md:text-5xl text-3xl font-bold md:leading-tight'>Hotels With Rooftop Pools Near Me</h1>
        <p className='py-4'>
          Discovering hotels with rooftop pools near you! Whether you're planning a luxurious vacation or a weekend getaway, our curated
          selection of hotels with rooftop pools will help you beat and elevate your travel experience.
        </p>
      </div>
      <div className='md:w-1/2 w-full mx-auto'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 1, spaceBetween: 40 },
            1024: { slidesPerView: 1, spaceBetween: 50 },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {[img1, img2, img3, img4].map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index}`} className='w-full lg:h-[420px] sm:h-96 h-80' />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Hero;
