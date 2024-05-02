import Image from "next/image";

const MenWomen = ({ props }) => {
  return (
    <div className="container">
      <div className="hair__men__women">
        <div className="men__women__headings__box">
          {props?.main_heading ? (
            <h2 className="men__women__heading">{props?.main_heading}</h2>
          ) : null}
          {props?.desc ? (
            <div
              dangerouslySetInnerHTML={{ __html: props?.desc }}
              className="men__women__desc"
            />
          ) : null}
        </div>
        <div className="first__box">
          <div className="row__men__women">
            <div className="col__men__women">
              {props?.img_one ? (
                <Image width={500} height={500} src={props.img_one} alt="Img" />
              ) : null}
            </div>
            <div className="col__men__women">
              <h2 className="head__txt">{props?.title_one}</h2>
              {props?.para_one ? (
                <p
                  className="para__txt"
                  dangerouslySetInnerHTML={{ __html: props?.para_one }}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="second__box">
          <div className="row__men__women flex__reverse">
            <div className="col__men__women">
              {props?.img_two ? (
                <Image width={500} height={500} src={props.img_two} alt="Img" />
              ) : null}
            </div>
            <div className="col__men__women">
              <h2 className="head__txt">{props?.title_two}</h2>
              {props?.para_two ? (
                <p
                  className="para__txt"
                  dangerouslySetInnerHTML={{ __html: props?.para_two }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenWomen;
