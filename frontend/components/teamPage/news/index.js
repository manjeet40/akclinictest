import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";

const settings = {
  dots: false,
  infinite: true,
  nextArrow: <SampleNextsArrow />,
  prevArrow: <SamplePrevsArrow />,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: false,
        dots: true,
        arrows: false,
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

const formatDate = (date) => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString(undefined, options);
  const [month, day, year] = formattedDate.split(" ");
  return `${month}, ${day.replace(",", "")} ${year}`;
};

const News = ({ props }) => {
  return (
    <div className="News_sec">
      <div className="mob_container">
        <div className="for_mob">
          <h2 className="news_head">News & Media</h2>
          <Slider {...settings}>
            {props &&
              props?.map((itm, id) => {
                return (
                  <div className="news_card" key={id}>
                    <div className="new_cardi">
                      <Image src={itm?.acf?.featured_image} fill={true} />
                    </div>
                    <div className="date_news">
                      {formatDate(itm.post_date.split(" ")[0])}
                    </div>
                    <div className="news_title">
                      <Link href={`/blog/${itm.post_name}`} target="_blank">
                        {itm.post_title}
                      </Link>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
      <div className="container for_desk">
        <h2 className="news_head">News & Media</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="news_card">
              <div className="new_cardi">
                <Image
                  src={props ? props[0]?.acf?.featured_image : ""}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="date_news">
                {props ? formatDate(props[0]?.post_date?.split(" ")[0]) : ""}
              </div>
              <div className="news_title">
                <Link href={`/blog/${props[0].post_name}`} target="_blank">
                  {props ? props[0]?.post_title : ""}
                </Link>
              </div>
            </div>
          </div>

          {props &&
            props?.slice(1).map((item, id) => {
              return (
                <div className="col-md-3" key={id}>
                  <div className="news_card1">
                    <div className="new_cardf">
                      <Image src={item?.acf?.featured_image} fill={true} />
                    </div>
                    <div className="date_news">
                      {formatDate(item.post_date?.split(" ")[0])}
                    </div>
                    <h2 className="news_title">
                      <Link href={`/blog/${item.post_name}`} target="_blank">
                        {item.post_title}
                      </Link>
                    </h2>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default News;
