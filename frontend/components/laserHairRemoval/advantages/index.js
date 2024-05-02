import Image from "next/image";

const advantages = ({ props }) => {
  return (
    <div className="advantages_removal_main_section">
      <div className="container">
        <h2 className="head_txt_advantages">{props?.title}</h2>
        <div className="advantages_removal_sub_section">
          <div className="left_box">
            <h3 className="sub_head_txt">{props?.sub_title}</h3>

            <div
              dangerouslySetInnerHTML={{
                __html: props?.description,
              }}
            ></div>

            <h3 className="sub_head_txt">{props?.sub_title_2}</h3>

            <div
              dangerouslySetInnerHTML={{
                __html: props?.description_2,
              }}
            ></div>
          </div>
          <div className="right_box">
            <Image width={1000} height={1000} src={props?.image} alt="Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default advantages;
