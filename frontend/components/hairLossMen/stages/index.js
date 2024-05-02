import Image from "next/image";

const Stages = ({ props }) => {
  return (
    <div className="container">
      <div className="stages__main__section">
        <div className="stages__sub__box">
          <h2 className="stages__head__txt">{props?.title}</h2>

          <div className="row hair__loss__stages">
            {props?.stages_content &&
              props?.stages_content.map((item, id) => {
                return (
                  <div className="col-lg-4" key={id}>
                    {item?.img ? (
                      <Image
                        width={100}
                        height={100}
                        src={item.img}
                        alt="Img"
                      />
                    ) : null}
                    <h4 className="stages__head">{item.title}</h4>
                    <p
                      className="stages__para"
                      dangerouslySetInnerHTML={{ __html: item.para_text }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stages;
