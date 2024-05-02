import Slider from "react-slick";
import Link from "next/link";
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
        {props?.locData &&
          props?.locData.map((item, id) => {
            return (
              <div className="location" key={id}>
                <Image
                  src="/location1.png"
                  alt="Image"
                  width={1000}
                  height={1000}
                />
                <div className="locat_cont">
                  <div className="container">
                    <h2 className="loc_h">{props.heading}</h2>
                    <div className="location_pin">
                      <h4 className="state">
                        {item.title} <br />
                        <span className="location">{item.city}</span>
                      </h4>
                      <p className="pin_location">
                        {item.address}
                        <br />
                        <br />
                        {item.phone_number}
                      </p>
                      <p className="map_link btn__anim">
                        <Link href={item.url} target="_blank">
                          {item.btn}
                        </Link>
                      </p>
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
