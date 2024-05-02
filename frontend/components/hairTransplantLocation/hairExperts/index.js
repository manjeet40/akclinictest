import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import CallbackPopup from "@/components/blogSingle/popup";

const HairExperts = ({ props }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    // Add logic to handle body overflow here
    document.body.style.overflow = showPopup ? "auto" : "hidden";
  };
  return (
    <div className="container">
      {showPopup && <CallbackPopup handleClose={togglePopup} />}
      <div className="hair__transplants__experts hair__transplants__experts__desktop">
        <h2 className="title">{props?.title}</h2>
        <div className="flex__content">
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: props?.desc }}
          ></p>
          <button className="btn btn__two">{props?.btn}</button>
        </div>

        <div className="row doc__boxes__experts">
          {props?.doctors &&
            props?.doctors.map((item, id) => {
              return (
                <div className="col-lg-3" key={id}>
                  <Image
                    width={300}
                    height={300}
                    src={item.img}
                    className="img__doc"
                  />
                  <div className="bg__color">
                    <h2 className="doc__name">{item.doc_name}</h2>
                    <h4 className="desig">{item.designation}</h4>
                    <h6 className="btn btn__anim">
                      <Link href={item.url} target="_blank">
                        {item.btn}
                      </Link>
                    </h6>
                  </div>
                </div>
              );
            })}

          <div className="col-lg-3">
            <div class="call_back_box call__back__experts">
              <h3 class="call_back_title">{props?.consultant_box?.title}</h3>
              <h5
                class="call_back_sub_title"
                dangerouslySetInnerHTML={{
                  __html: props?.consultant_box?.desc,
                }}
              ></h5>
              <button class="call_back_btn" onClick={togglePopup}>
                {props?.consultant_box?.btn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairExperts;
