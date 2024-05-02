import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";
import Link from "next/link";

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
const Story = ({ props, stories_posts }) => {
  const router = useRouter();
  return (
    <div className="story_sec">
      <div className="container">
        <div className="story_text_sec story__banner__m">
          <h2 className="story_head">{props?.title}</h2>
          <h3 className="story_subhead">{props?.subtitle}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: `${props?.description}`,
            }}
          />
          <button onClick={() => router.push(`${props?.cta_link}`)}>
            {props?.cta}
          </button>
        </div>
      </div>
      <div className="slider_s">
        <div className="story_slider">
          <Slider {...settings} initialSlide={stories_posts.length - 1}>
            {stories_posts &&
              stories_posts.map((itm, id) => (
                <div className="story_card" key={id}>
                  <Image
                    src={itm?.acf?.featured_image}
                    className="our__stories__main__img"
                    width={300}
                    height={300}
                  />
                  <div className="bottom_s_txt">
                    <p
                      dangerouslySetInnerHTML={{ __html: itm.title.rendered }}
                    />
                    <Link href={`/blog/${itm.slug}`} target="_blank">
                      <span className="story_link btn__anim">LEARN MORE</span>
                    </Link>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default Story;
