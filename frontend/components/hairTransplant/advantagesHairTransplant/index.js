import Link from "next/link";
import Image from "next/image";

const Benifits = ({ props }) => {
  return (
    <div className="ach_sec">
      <div className="container">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="achi_dtl">
            <h2
              className="team_h1 wow fadeInUp"
              dangerouslySetInnerHTML={{ __html: props?.title }}
            ></h2>
            <p
              className="ach_p-txt wow fadeInUp txt-justify"
              style={{ marginTop: "16px", marginBottom: "40px" }}
              dangerouslySetInnerHTML={{ __html: props.description }}
            />
          </div>
        </div>
        <div className="row">
          {props?.advantage &&
            props?.advantage.map((item, id) => {
              return (
                <div className="col-lg-3 col-md-6 col-sm-12 mb__30" key={id}>
                  <div className="exp_card" style={{ marginTop: "15px" }}>
                    {item.image && (
                      <Image
                        width={100}
                        height={100}
                        src={item.image}
                        style={{ width: "auto", height: "55px" }}
                        alt="Img"
                      />
                    )}
                    <h6 className="ad_h">
                      {item.url ? (
                        <Link href={item.url} target="_blank">
                          <span
                            style={{ color: "#231f20", cursor: "pointer" }}
                            onMouseEnter={(e) => {
                              e.target.style.color = "inherit";
                              e.target.style.cursor = "inherit";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = "black";
                              e.target.style.cursor = "pointer";
                            }}
                          >
                            {item.title}
                          </span>
                        </Link>
                      ) : (
                        <span>{item.title}</span>
                      )}
                    </h6>
                    <p
                      className="ad_p"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default Benifits;
