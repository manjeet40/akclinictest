import Image from "next/image";

const PostOperativeIns = ({ props }) => {
  return (
    <div className="p_o_i">
      <div className="container">
        <h2
          className="p_o_h"
          dangerouslySetInnerHTML={{ __html: props?.title }}
        ></h2>
        <div
          className="p_o_p"
          dangerouslySetInnerHTML={{ __html: props?.description }}
        ></div>
        <div className="row">
          {props?.instruction &&
            props?.instruction.map((item, id) => {
              return (
                <div className="col-md-3 col-6" key={id}>
                  <div className="p_card">
                    <Image
                      width={100}
                      height={100}
                      src={item.image}
                      style={{ width: "75px", height: "auto" }}
                      alt="Image"
                    />
                    <h5
                      className="po_h"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></h5>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default PostOperativeIns;
