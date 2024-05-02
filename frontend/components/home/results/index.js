import Image from "next/image";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
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
      <Image src="/arrow_r.svg" width={56} height={56} />
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

const delimiterIconStyles = {
  width: "56px",
  height: "56px",
  backgroundSize: "cover",
  borderRadius: "none",
  backgroundImage: "url(/img_arrow.svg)",
};

const Results = ({ props }) => {
  return (
    <div className="results">
      <div className="r_container">
        <div className="image_div">
          <ReactBeforeSliderComponent
            firstImage={{ imageUrl: props?.before_image }}
            secondImage={{ imageUrl: props?.after_image }}
            delimiterColor="rgba(35, 31, 32, 1)"
            delimiterIconStyles={delimiterIconStyles}
          />
        </div>
        <div className="result_desc">
          <h2 className="result_h_0 wow fadeInUp">{props?.title}</h2>
          <p className="res_p_0 wow fadeInUp">{props?.description}</p>
          <button className="wow fadeInUp btn__two">
            <Link href={props?.cta_link} target="_blank">
              {props?.cta}
            </Link>
          </button>
        </div>
        <div className="result_slider">
          <h2 className="result_h_0 wow fadeInUp">
            {props?.testimonials_title}
          </h2>
          <div className="result_slide wow fadeInUp">
            <div className="slide_img_top">
              <Image src="/img_t.svg" width={76} height={53} />
            </div>
            <Slider {...settings}>
              {props?.testimonials &&
                props?.testimonials.map((itm, id) => {
                  return (
                    <div className="res_slide_0" key={id}>
                      <div className="res_text">
                        <p>{itm.testimonial}</p>
                      </div>
                      <p className="res_name">{itm.name}</p>
                    </div>
                  );
                })}
            </Slider>
            <div className="image_bottom">
              <Image src="/img_b.svg" width={140} height={97} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Results;
