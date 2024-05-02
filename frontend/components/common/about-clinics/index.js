import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const AboutUs = ({ props }) => {
  useEffect(() => {
    document.addEventListener("scroll", inView(), {
      passive: true,
    });
  }, []);

  const inView = () => {
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting === true)
          document.querySelector("#aboutsvg").classList.add("active");
      },
      { threshold: [0] }
    );

    observer.observe(document.querySelector(".about_us"));
  };
  return (
    <div className="about_us">
      <h2
        className="about_head_0"
        dangerouslySetInnerHTML={{ __html: props?.title }}
      ></h2>
      <div className="ak_log_9">
        <svg
          width="290"
          height="290"
          viewBox="0 0 618 730"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="aboutsvg"
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
      <div className="about_cont">
        <div className="absolute_img">
          <Image
            src={props?.image}
            width={500}
            height={500}
            className="abso__lute"
            priority
            style={{ objectFit: "cover", zIndex: "999" }}
          />
        </div>
      </div>
      <div className="cont_a_1">
        <div className="cont_r_0">
          <div className="empty_40"></div>
          <div className="cont_60">
            <h3
              className="cont_h_6"
              dangerouslySetInnerHTML={{ __html: props?.sub_title }}
            ></h3>
            <div
              dangerouslySetInnerHTML={{
                __html: `${props?.description}`,
              }}
            />
            <button className="btn__two">
              <Link href={props?.cta_link} target="blank">
                {props?.cta}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
