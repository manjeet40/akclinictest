import Link from "next/link";
import Image from "next/image";

const Expert = ({ props }) => {
  return (
    <div className="ach_sec pt__0 ach_sec__desktop">
      <div className="container">
        <div className="col-md-6">
          <div className="achi_dtl">
            <h2 className="team_h1 wow fadeInUp">{props?.title}</h2>
            <h3 className="team_subhead wow fadeInUp">{props?.sub_title}</h3>
            <div
              className="ach_p wow fadeInUp"
              style={{ marginTop: "16px", marginBottom: "40px" }}
            >
              {props?.description}
            </div>
          </div>
        </div>
        <div className="row">
          {props?.doctors &&
            props?.doctors.map((item, id) => {
              return (
                <div className="col-md-3" key={id}>
                  <div className="exp_card">
                    <Image
                      width={300}
                      height={300}
                      src={item.acf.doctor_image.url}
                    />
                    <div className="exp_dtl">
                      <h4 className="exp_name">{item.post_title}</h4>
                      <div className="exp_post">{item.acf.profile}</div>
                      <div
                        className="exp_link btn__anim"
                        style={{ cursor: "pointer" }}
                      >
                        <Link href={item.acf.cta_link} target="blank">
                          KNOW MORE
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default Expert;
