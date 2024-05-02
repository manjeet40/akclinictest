import { useEffect } from "react";
import Image from "next/image";

const WhyAkCinic = ({ props }) => {
  useEffect(() => {
    const inView = () => {
      const observer = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting === true) {
            console.log("Element has just become visible on the screen");
            document.querySelector("#whysvg").classList.add("active");
          }
        },
        { threshold: [1] }
      );

      const element = document.querySelector(".left__ak");
      observer.observe(element);

      // Clean up the observer when the component unmounts
      return () => {
        observer.unobserve(element);
      };
    };

    // Call the inView function to set up the IntersectionObserver
    inView();
  }, []);

  return (
    <div className="why__ak__main">
      <div className="left__ak">
        <svg
          width="618"
          height="100%"
          viewBox="0 0 618 730"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="whysvg"
        >
          <path
            d="M-113 447.954L202.227 132.727V730"
            stroke="#F47920"
            strokeOpacity="1"
            strokeWidth="1.8"
            className="svg-elem-1"
          ></path>
          <path
            d="M301.773 0V580.682L459.386 423.068M617 265.455L459.386 423.068M459.386 423.068L583.818 547.5"
            stroke="#F47920"
            strokeOpacity="1"
            strokeWidth="1.8"
            className="svg-elem-2"
          ></path>
        </svg>
      </div>
      <div className="right__ak">
        <h2 className="main__title">{props?.title}</h2>

        <div className="row">
          {props?.content_why &&
            props?.content_why.map((item, id) => {
              return (
                <div className="col-lg-6 box__why" key={id}>
                  <Image width={200} height={200} src={item.img} alt="Image" />
                  <h3 className="title">{item.title}</h3>
                  <p className="desc">{item.desc}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WhyAkCinic;
