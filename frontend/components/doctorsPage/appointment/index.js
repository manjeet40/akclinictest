import Link from "next/link";

const Appointment = ({ props }) => {
  return (
    <div className="appointment__section">
      <div className="container">
        <h2
          className="appoint__title"
          dangerouslySetInnerHTML={{ __html: props?.title }}
        ></h2>
        <div className="row">
          <div className="col-lg-6">
            <div
              className="appoint__para"
              dangerouslySetInnerHTML={{ __html: props?.desc }}
            />
          </div>
          <div className="col-lg-6 tags__box__main">
            <h6 className="appoint__tag__title">{props?.tag_title}</h6>
            <div className="tags__box">
              {props?.tags &&
                props?.tags.map((item, id) => {
                  return (
                    <div key={id}>
                      <Link href={item.url} target="_blank">
                        <h6
                          dangerouslySetInnerHTML={{ __html: item.tag_text }}
                        ></h6>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
