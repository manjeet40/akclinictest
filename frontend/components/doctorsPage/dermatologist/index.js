import Image from "next/image";

const Dermatologist = ({ props }) => {
  return (
    <div className="container">
      <div className="derma__main">
        <div className="row">
          <div className="col-lg-6">
            <h2
              className="derma__title"
              dangerouslySetInnerHTML={{ __html: props?.title }}
            ></h2>
            <div
              className="derma__para"
              dangerouslySetInnerHTML={{ __html: props?.desc }}
            />
          </div>
          <div className="col-lg-6">
            <div className="row">
              {props?.derma_repeat &&
                props?.derma_repeat.map((item, id) => {
                  return (
                    <div className="col-lg-12 derma__right__content" key={id}>
                      <div>
                        <Image
                          width={200}
                          height={200}
                          src={item.img}
                          alt="Img"
                          className="derma__img"
                        />
                      </div>
                      <div className="text__content">
                        <h3
                          className="title"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        ></h3>
                        <div
                          className="desc"
                          dangerouslySetInnerHTML={{ __html: item.desc }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dermatologist;
