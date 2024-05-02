import { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";

const settings = {
  dots: true,
  infinite: true,
  arrow: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
};

const Location = ({ props }) => {
  return (
    <div className="location_sec">
      <Slider {...settings}>
        {props?.location &&
          props?.location.map((item, id) => {
            return (
              <div className="location" key={id}>
                <Image
                  width={200}
                  height={200}
                  src="/location1.png"
                  alt="Image"
                />
                <div className="locat_cont">
                  <div className="container">
                    <h2 className="loc_h">{props?.title}</h2>
                    <div className="location_pin">
                      <h4 className="state">
                        {item.title}
                        <br />
                        <span className="location">{item.city}</span>
                      </h4>
                      <p className="pin_location">
                        {item.address}
                        <br />
                        <br />
                        {item.number}
                      </p>
                      <p className="map_link btn__anim">{item.btn}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};
export default Location;
