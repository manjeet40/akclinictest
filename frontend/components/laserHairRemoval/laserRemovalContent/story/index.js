import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  nextArrow: <SampleNextsArrow />,
  prevArrow: <SamplePrevsArrow />,
  slidesToShow: 1.99999,
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
const Story = (props) => {
  const router = useRouter();
  return (
    <div className="story_sec">
      <div className="container-fliud hair_transplant_story_main_section">
        <div className="story_text_sec hair_txt_story_box">
          <h2 className="story_head">{props?.storyData?.title}</h2>
          <h3 className="story_subhead">{props?.storyData?.subtitle}</h3>
          <p className="txt-justify">{props?.storyData?.description}</p>
          <button onClick={() => router.push(`${props?.storyData?.cta_link}`)}>
            {props?.storyData?.cta_text}
          </button>
        </div>

        <div className="slider_s hair_transplant_slider">
          <div className="story_slider">
            <Slider {...settings}>
              {props?.storyData?.stories &&
                props?.storyData?.stories.map((item, id) => {
                  return (
                    <div className="story_card" key={id}>
                      <Image
                        width={300}
                        height={300}
                        src={item?.acf?.image?.url}
                        alt={item.post_name}
                      />
                      <div className="bottom_s_txt">
                        <p>{item.post_title}</p>
                        <span className="story_link btn__anim">LEARN MORE</span>
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
export default Story;
