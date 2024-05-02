import Image from "next/image";
import Slider from "react-slick";
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
const SurgeryType = ({ props }) => {
  return (
    <div className="services" style={{ background: "#fff" }}>
      <div className="container surgery_type">
        <h2
          className="service_head"
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          {props?.title}
        </h2>
        <div className="slider_service">
          <Slider {...settings}>
            {props?.step_data &&
              props?.step_data.map((item, id) => {
                return (
                  <div className="slide_cont surgery_slide_cont" key={id}>
                    <div className="slide_left">
                      <div className="cont_head_s" style={{ marginTop: "0px" }}>
                        <strong style={{ color: "rgba(244, 121, 32, 1)" }}>
                          {id + 1}
                        </strong>{" "}
                        <b>{item.title}</b>
                      </div>
                      <div className="slidw_p_0">
                        <div
                          className="txt-justify"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>
                    <div className="slide_right">
                      <Image
                        src={item.image}
                        width={500}
                        height={500}
                        alt="image"
                      />
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
export default SurgeryType;
