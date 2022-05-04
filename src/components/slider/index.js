import React, { useEffect, useState } from 'react';
import { SliderContainer } from './style';
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// eslint-disable-next-line no-unused-vars
import { Swiper,Autoplay, Pagination, SwiperSlide, Navigation} from 'swiper'
// Swiper.use([Pagination, Autoplay,Navigation])

function Slider (props) {
    const [sliderSwiper, setSliderSwiper] = useState (null);
    const { bannerList } = props;
  
    useEffect (() => {
      if (bannerList.length && !sliderSwiper){
          let newSliderSwiper = new Swiper(".slider-container", {
            loop: true,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
            modules: [Pagination, Autoplay],
            pagination: {el:'.swiper-pagination'},
          });
          setSliderSwiper(newSliderSwiper);
      }
    }, [bannerList.length, sliderSwiper]);
    
    return (
      <SliderContainer>
        <div className="slider-container">
          <div className="swiper-wrapper">
            {
              bannerList.map ((slider,index) => {
                return (
                  <div className="swiper-slide" key={slider.imageUrl+`${index}`}>
                    <div className="slider-nav">
                      <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <div className="before"></div>
      </SliderContainer>
    //   (
    //     <SliderContainer>
    //         <Swiper pagination={true} modules={[Pagination,Autoplay]} className="mySwiper">
    //             <SwiperSlide>Slide 1</SwiperSlide>
    //             <SwiperSlide>Slide 2</SwiperSlide>
    //             <SwiperSlide>Slide 3</SwiperSlide>
    //             <SwiperSlide>Slide 4</SwiperSlide>
    //             <SwiperSlide>Slide 5</SwiperSlide>
    //             <SwiperSlide>Slide 6</SwiperSlide>
    //             <SwiperSlide>Slide 7</SwiperSlide>
    //             <SwiperSlide>Slide 8</SwiperSlide>
    //             <SwiperSlide>Slide 9</SwiperSlide>
    //         </Swiper>
    //         <div className="before"></div>
    //   </SliderContainer>
    //   )
    );
  }
  
  export default React.memo (Slider);