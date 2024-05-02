import Image from "next/image";
import Link from "next/link";

const Footer = (props) => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div className="footer">
      <div className="container">
        <div className="row footer__flex">
          <div className="col-md-3">
            <div className="footer_first wow fadeInUp">
              <Image
                src={props?.commonData?.footer?.logo.url}
                width={230}
                height={63}
              />
              <p>{props?.commonData?.footer?.short_description}</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="footer_sec  wow fadeInUp">
              <div className="footer_head">Explore</div>
              {props?.commonData?.footer?.footer_links &&
                props?.commonData?.footer?.footer_links.map((item, id) => {
                  return (
                    <div className="footer_link">
                      <Link
                        prefetch={false}
                        href={item.url}
                        target="_blank"
                        className="footer_link"
                      >
                        {item.page_name}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-md-3">
            <div className="footer_sec  wow fadeInUp">
              <div className="footer_head">Contact</div>
              <div className="footer_link">
                {props?.commonData?.footer?.phone}
              </div>
              <div className="footer_link">
                {props?.commonData?.footer?.email}
              </div>
              <div className="footer_link">
                {props?.commonData?.footer?.address}
              </div>
              <div className="footer_link">
                {props?.commonData?.footer?.address_two}
              </div>
              <div className="footer_link">
                {props?.commonData?.footer?.address_three}
              </div>
              <div className="footer_link">
                {props?.commonData?.footer?.address_four}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="footer_sec  wow fadeInUp">
              <div className="footer_head">Stay In the Loop</div>
              <div className="form_foot">
                <input type="text" placeholder="Email*" />
                <button>SUBMIT</button>
              </div>
              <div className="social_link" style={{ marginTop: "42px" }}>
                <div className="footer_head">Follow Us On</div>
                <div className="socal_link">
                  <span
                    className="link_s"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(
                        `${props?.commonData?.social_links?.facebook}`
                      )
                    }
                  >
                    <Image src="/fb.svg" width={20} height={20} />
                  </span>
                  <span
                    className="link_s"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(
                        `${props?.commonData?.social_links?.linkedin}`
                      )
                    }
                  >
                    <Image src="/ln.svg" width={18} height={18} />
                  </span>
                  <span
                    className="link_s"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(
                        `${props?.commonData?.social_links?.instagram}`
                      )
                    }
                  >
                    <Image src="/in.svg" width={20} height={20} />
                  </span>
                  <span
                    className="link_s"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      window.open(`${props?.commonData?.social_links?.youtube}`)
                    }
                  >
                    <Image src="/yt.svg" width={20} height={16} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <span className="footer_left wow fadeInUp">
            © {getCurrentYear()} AK Clinics, All rights reserved
          </span>
          <span className="footer_left wow fadeInUp">
            <Link href={"https://thor.solutions/"} target="_blank">
              Powered By Thor Solutions
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Footer;
