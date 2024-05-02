import Image from "next/image";
import { useEffect } from "react";

const WhyUs = ({ props }) => {
  useEffect(() => {
    document.addEventListener("scroll", inView(), {
      passive: true,
    });
  }, []);
  const inView = () => {
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true)
          document.querySelector("#whysvg").classList.add("active");
      },
      { threshold: [0] }
    );

    observer.observe(document.querySelector(".abt_a_i"));
  };
  return (
    <div className="whyUs">
      <div className="abt_a_i">
        <svg
          width="290"
          height="290"
          viewBox="0 0 618 730"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="whysvg"
        >
          <path
            d="M-113 447.954L202.227 132.727V730"
            stroke="#F47920"
            strokeOpacity="0.5"
            strokeWidth="1.43466"
            className="svg-elem-1"
          ></path>
          <path
            d="M301.773 0V580.682L459.386 423.068M617 265.455L459.386 423.068M459.386 423.068L583.818 547.5"
            stroke="#F47920"
            strokeOpacity="0.5"
            strokeWidth="1.43466"
            className="svg-elem-2"
          ></path>
        </svg>
      </div>
      <div className="container">
        <div className="why_row">
          <div className="why_0">
            <h2 className="why_h">{props?.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: props?.description }} />
          </div>
          <div className="why_1">
            {props?.points &&
              props?.points.map((itm, id) => {
                return (
                  <div className="about_grid" key={id}>
                    <Image src={itm.icon.url} width={87} height={87} />
                    <div className="abt_grid_c">
                      <h4 className="grid_h">{itm.title}</h4>
                      <p
                        dangerouslySetInnerHTML={{ __html: itm.description }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhyUs;
