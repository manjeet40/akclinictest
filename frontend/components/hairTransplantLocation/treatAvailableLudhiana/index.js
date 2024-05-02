import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Configure the slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <Image
        src="/arrow_r.svg"
        className="treat__available__arrow__right"
        width={56}
        height={56}
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <Image src="/arrow_l.svg" width={56} height={56} />
    </div>
  );
}

// Configure the slider settings
const sliderSettingsTwo = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const TreatAvailable = ({ props }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchDataFromBackend = props.treat_content || [];

  const chunkedPostsDesktop = [];
  for (let i = 0; i < fetchDataFromBackend.length; i += 3) {
    chunkedPostsDesktop.push(fetchDataFromBackend.slice(i, i + 3));
  }

  const chunkedPostsMobile = [];
  for (let i = 0; i < fetchDataFromBackend.length; i += 1) {
    chunkedPostsMobile.push(fetchDataFromBackend.slice(i, i + 1));
  }

  if (isMobile) {
    return (
      <div className="treat__available__main treat__available__main__mobile">
        <div className="container">
          <h2 className="title proper__case">{props?.title}</h2>
          <Slider {...sliderSettingsTwo}>
            {chunkedPostsMobile.map((chunk, index) => (
              <div key={index} className="row treat__flex">
                {chunk.map((post) => (
                  <div key={post.id} className={`col-lg-4 col-sm-12`}>
                    <h3 className="title">{post.title}</h3>
                    <p
                      className="desc"
                      dangerouslySetInnerHTML={{ __html: post.desc }}
                    />
                    <Link href={post.url} target="_blank">
                      <span className="btn btn__anim">{post.button}</span>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  } else {
    return (
      <div className="treat__available__main treat__available__main__desktop">
        <div className="container">
          <h2 className="title proper__case">{props?.title}</h2>
          <Slider {...sliderSettings}>
            {chunkedPostsDesktop.map((chunk, index) => (
              <div key={index} className="row treat__flex">
                {chunk.map((post) => (
                  <div key={post.id} className={`col-lg-4 col-sm-12`}>
                    <h3 className="title">{post.title}</h3>
                    <p
                      className="desc"
                      dangerouslySetInnerHTML={{ __html: post.desc }}
                    />
                    <Link href={post.url} target="_blank">
                      <span className="btn btn__anim">{post.button}</span>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
};

export default TreatAvailable;
