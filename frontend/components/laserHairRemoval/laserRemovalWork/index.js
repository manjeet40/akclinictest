import Image from "next/image";

const laserRemovalWork = ({ props }) => {
  return (
    <div className="container">
      <div className="laser_removal_work_main_section">
        <div className="laser_removal_work_sub_section">
          <div className="top_box">
            <h2 className="head_txt">{props?.title}</h2>
            <p
              className="para_txt"
              dangerouslySetInnerHTML={{ __html: props?.description }}
            ></p>
          </div>

          <div className="bottom_box">
            {props?.process &&
              props?.process.map((item, id) => {
                return (
                  <div className="work_box" key={id}>
                    <Image
                      width={300}
                      height={300}
                      src={item.image}
                      alt="Image"
                    />
                    <p
                      className="content_para"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default laserRemovalWork;
