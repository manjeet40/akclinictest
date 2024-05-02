import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";

const settings = {
  dots: false,
  infinite: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        dots: true,
        arrows: false,
      },
    },
  ],
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
const Team = ({ props }) => {
  return (
    <div className="team_sec">
      <div className="container">
        <div className="team_row">
          <div className="team_left">
            <h2 className="team_h1">{props?.title}</h2>
            <h3 className="team_subhead">{props?.subtitle}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: `${props?.description}`,
              }}
            />
          </div>
          <div className="team_right">
            <Slider {...settings}>
              {props?.doctors &&
                props?.doctors.map((itm, id) => {
                  return (
                    <div className="exp_card" key={id}>
                      <Image width={200} height={200} src={itm.doctor_image} />
                      <div className="exp_dtl">
                        <div className="exp_name">{itm.name}</div>
                        <div className="exp_post">{itm.profile}</div>
                        <div
                          className="exp_link btn__anim"
                          style={{ cursor: "pointer" }}
                        >
                          <Link href={itm.cta_link} target="_blank">
                            {itm.cta}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Team;
