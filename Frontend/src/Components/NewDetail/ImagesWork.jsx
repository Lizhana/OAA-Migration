
import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function SwipeableTextMobileStepper({ newDetail }) {
  const images = newDetail?.image;
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handleBack = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div>
      <Slider {...settings} ref={sliderRef}>
        {images?.map((step, index) => (
          <div key={step?.label}>
            <img src={step?.url} alt={step?.label} width='100%' />
            <p>{step?.caption}</p>
          </div>
        ))}
      </Slider>
      <div style={{ display: 'flex' }}>
        <br />
      </div>
    </div>
  );
}
