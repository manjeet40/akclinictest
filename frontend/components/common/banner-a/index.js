import Image from "next/image";
import Link from "next/link";

const Bannner = ({ props }) => {
  return (
    <div className="banner">
      <Image
        src={props?.image}
        style={{ zIndex: "-1", objectFit: "cover" }}
        priority
        width={1000}
        height={1000}
        className="banner__img"
      />
      <div className="banner_cont">
        <div className="container">
          <div className="bannner_content wow fadeInUp animated">
            <h1
              className="bannner_heading"
              dangerouslySetInnerHTML={{ __html: props?.title }}
            ></h1>
            <h2
              className="home_banner_sub_txt"
              dangerouslySetInnerHTML={{ __html: props?.sub_title }}
            ></h2>
            <button>
              <Link href={props?.cta_link} target="blank">
                {props?.cta}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bannner;
