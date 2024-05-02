import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";

const settings = {
  dots: false,
  infinite: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  slidesToShow: 1,
  slidesToScroll: 1,
};
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <Image src="/arrow_right.svg" width={56} height={56} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <Image src="/arrow_left.svg" width={56} height={56} />
    </div>
  );
}
const Services = ({ props }) => {
  return (
    <div className="services">
      <div className="container">
        <h2 className="service_head">{props?.title}</h2>
        <div className="slider_service">
          <Slider {...settings}>
            {props?.slide &&
              props?.slide.map((itm, id) => {
                return (
                  <div className="slide_cont" key={id}>
                    <div className="slide_left">
                      <div className="service_s_1">
                        <span className="active_s_1">{id + 1}</span>
                        <span className="disabled_s_1">
                          /{props?.slide.length}
                        </span>
                      </div>
                      <h3 className="cont_head_s">{itm.slide.title}</h3>
                      <div
                        className="slidw_p_0"
                        dangerouslySetInnerHTML={{
                          __html: `${itm.slide.description}`,
                        }}
                      />
                      <button className="slide_s0_b btn__two">
                        <Link href={itm.slide.cta_link} target="_blank">
                          {itm.slide.cta}
                        </Link>
                      </button>
                    </div>
                    <div className="slide_right">
                      <Image src={itm.slide.image} fill={true} />
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
export default Services;
