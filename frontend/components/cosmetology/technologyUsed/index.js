import Slider from "react-slick";
import Image from "next/image";

const settings = {
  dots: false,
  infinite: true,
  nextArrow: <SampleNextsArrow />,
  prevArrow: <SamplePrevsArrow />,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function SampleNextsArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <Image src="/arrow_r.svg" width={56} height={56} />
    </div>
  );
}

function SamplePrevsArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <Image src="/arrow_l.svg" width={56} height={56} />
    </div>
  );
}

const Technology = ({ props }) => {
  return (
    <div className="container">
      <div className="tech__used__main">
        <div className="tech__top__box">
          <h2 className="tech__title">{props?.title}</h2>
          <p
            className="tech__desc"
            dangerouslySetInnerHTML={{ __html: props?.desc }}
          ></p>
        </div>
      </div>

      <div className="tech__used__slider">
        <div className="tech__slider">
          <Slider {...settings}>
            {props?.slider_content &&
              props?.slider_content.map((item, id) => {
                return (
                  <div className="tech_card" key={id}>
                    <Image
                      width={300}
                      height={300}
                      src={item.img}
                      alt={item.title}
                      className="img__ultracel"
                    />
                    <div className="bottom_s_txt">
                      <h6 className="title">{item.title}</h6>
                      <p className="desc">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Technology;
