import Image from "next/image";

const areasTreated = ({ props }) => {
  return (
    <div className="areas_treated_main_section">
      <div className="container">
        <div className="areas_treated_sub_section">
          <div className="top_box">
            <h2 className="head_txt">{props?.title}</h2>
            <p className="para_txt">{props?.description}</p>
          </div>

          <div className="bottom_box">
            {props?.area &&
              props?.area.map((item, id) => {
                return (
                  <div className="work_box" key={id}>
                    {item.image && (
                      <Image
                        width={150}
                        height={150}
                        src={item.image}
                        alt={item?.title || ""}
                      />
                    )}
                    <h3 className="sub_head_txt">{item.title}</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                      className="content_para"
                    ></div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default areasTreated;
