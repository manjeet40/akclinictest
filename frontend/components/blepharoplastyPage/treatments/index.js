import Image from "next/image";

const BlepharoplastyTreatment = ({ props }) => {
  return (
    <div className="costmetology__treatments__main">
      <div className="container">
        <h2 className="title">{props?.title}</h2>

        <div className="cosmetology__content">
          <div className="row">
            {props?.treat_content &&
              props?.treat_content.map((item, id) => {
                return (
                  <div
                    className="col-lg-4 col-6 treatments__cosmetology__boxes"
                    key={id}
                  >
                    <Image
                      width={30}
                      height={30}
                      src={item.image}
                      alt="Image"
                      className="img__treatments"
                    />
                    <h3 className="title__text">{item.title_text}</h3>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlepharoplastyTreatment;
