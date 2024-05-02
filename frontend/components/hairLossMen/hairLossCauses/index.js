import Image from "next/image";

const laserRemoval = ({ props }) => {
  return (
    <div>
      <div className="training_removal_main_section">
        <div className="training_removal_sub_section stages__hairloss__sub__section">
          <div className="left_box">
            <Image width={500} height={500} src={props?.img} alt="Image" />
          </div>
          <div className="right_box">
            <div className="empty_box"></div>
            <div className="sub_box_content">
              <h2 className="head_txt">{props?.title}</h2>
              <p
                className="para_txt"
                dangerouslySetInnerHTML={{ __html: props?.para_text }}
              />
              <div dangerouslySetInnerHTML={{ __html: props?.ul_list }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default laserRemoval;
