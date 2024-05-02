import Image from "next/image";

const laserRemoval = ({ props }) => {
  return (
    <div>
      <div className="training_removal_main_section">
        <div className="training_removal_sub_section">
          <div className="left_box">
            <Image width={300} height={300} src={props?.img} alt="Image" />
          </div>
          <div className="right_box">
            <div className="empty_box"></div>
            <div className="sub_box_content">
              <h2 className="head_txt">{props?.title}</h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: props?.text_repeat,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default laserRemoval;
