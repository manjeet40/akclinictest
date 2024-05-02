import Image from "next/image";

const Achievement = ({ props }) => {
  return (
    <div className="ach_sec">
      <div className="container">
        <div className="award_sec">
          <div className="award">
            <h2 className="awrd_h wow fadeInUp">{props?.title}</h2>
            <p className="awrd_p wow fadeInUp">{props?.description}</p>
          </div>
          <div className="row img__hover__anim">
            {props?.awards &&
              props?.awards.map((item, id) => {
                return (
                  <div className="col-md-2 img__hover" key={id}>
                    <div className="image_sec_awrd">
                      <Image src={item.image} width={150} height={75} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Achievement;
