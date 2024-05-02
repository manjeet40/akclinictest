import Image from "next/image";

const banner = ({ props }) => {
  return (
    <div className="training_banner">
      <div className="absolute_img">
        <Image
          width={1000}
          height={1000}
          src={props?.image}
          alt={props?.image}
        />
        <div className="container">
          <div className="training_content hair_loss_content">
            <div className="training_banner_content">
              <h1
                className="banner_training_head_txt"
                style={{ textTransform: "capitalize" }}
              >
                {props?.title}
              </h1>
              <h2 className="banner_training_sub_txt">{props?.sub_title}</h2>
            </div>
            <div className="bread_crums training_bread_crums">
              <p className="bread_crum_content">
                Home {">"} <span className="color_bread_crums">Hair Loss</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default banner;
