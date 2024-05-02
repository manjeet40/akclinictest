import Image from "next/image";

const laserRemoval = ({ props }) => {
  return (
    <div>
      <div className="laser_removal_main_section">
        <div className="laser_removal_sub_section">
          <div className="left_box">
            <Image width={1000} height={1000} src={props?.image} alt="Image" />
          </div>
          <div className="right_box">
            <div className="empty_box"></div>
            <div className="sub_box_content">
              <h2 className="head_txt">{props?.title}</h2>
              <p
                className="para_txt"
                dangerouslySetInnerHTML={{ __html: props?.description }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default laserRemoval;
