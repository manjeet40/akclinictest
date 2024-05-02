import { useEffect } from "react";
import Image from "next/image";

const HairContent = ({ props }) => {
  useEffect(() => {
    document.addEventListener("scroll", inView(), {
      passive: true,
    });
  });
  const inView = () => {
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true)
          console.log("Element has just become visible in screen");
        document.querySelector("#homesvg").classList.add("active");
      },
      { threshold: [1] }
    );

    observer.observe(document.querySelector(".home_cont_img"));
  };
  return (
    <div className="home_content hair__transplant__content">
      <div className="home_cont_img" style={{ bottom: "0px" }}>
        <svg
          width="800"
          height="100%"
          viewBox="0 0 618 730"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="homesvg"
        >
          <path
            d="M-113 447.954L202.227 132.727V730"
            stroke="#F47920"
            strokeOpacity="1"
            strokeWidth="1.43466"
            className="svg-elem-1"
          ></path>
          <path
            d="M301.773 0V580.682L459.386 423.068M617 265.455L459.386 423.068M459.386 423.068L583.818 547.5"
            stroke="#F47920"
            strokeOpacity="1"
            strokeWidth="1.43466"
            className="svg-elem-2"
          ></path>
        </svg>
      </div>
      <div className="container">
        <div className="content_row hair_transplant_row">
          <div className="content_left"></div>
          <div className="content_right hair_transplant_content_right">
            <h2 className="content_head wow fadeInUp">{props?.title}</h2>
            <div className="p_o wow fadeInUp" style={{ paddingLeft: "0px" }}>
              <h3 className="p_0_h">{props?.description}</h3>
              <div className="bottom_content_hair_transplant">
                <div className="row">
                  {props?.services &&
                    props?.services.map((itm, id) => {
                      return (
                        <div className="col-md-6" key={id}>
                          <div className="info_box">
                            <Image
                              src={itm.image}
                              width={87}
                              height={87}
                              alt="Img"
                            />
                            <div>
                              <h3 className="txt_heading">{itm.title}</h3>
                              <p className="txt-para">{itm.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HairContent;
