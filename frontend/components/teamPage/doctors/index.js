import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import CallbackPopup from "@/components/blogSingle/popup";

const Doctors = ({ props }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    // Add logic to handle body overflow here
    document.body.style.overflow = showPopup ? "auto" : "hidden";
  };

  return (
    <div className="container">
      {showPopup && <CallbackPopup handleClose={togglePopup} />}
      <div className="doctors_section">
        {props &&
          props.map((item, id) => {
            return (
              <div className="doctors_box">
                <Image
                  src={item.img}
                  alt={item.doc_name}
                  width={200}
                  height={200}
                />
                <div className="doctors_sub_box">
                  <h2 className="doc_name">{item.doc_name}</h2>
                  <h4 className="doc_sub_txt">{item.designation}</h4>

                  <h3 className="sub_head_txt">Qualifications</h3>
                  <h4 className="doc_sub_txt">{item.qualifications}</h4>

                  <h3 className="sub_head_txt">Specializations</h3>
                  <div className="tag__box__doc">
                    {item.specialization &&
                      item.specialization.map((item, id, array) => {
                        return (
                          <Link href={item.url} target="_blank">
                            <p
                              key={id}
                              className="doc_sub_txt"
                              dangerouslySetInnerHTML={{
                                __html:
                                  item.name +
                                  (id !== array.length - 1 ? "," : ""),
                              }}
                            />
                          </Link>
                        );
                      })}
                  </div>
                </div>
                <div className="doctors_sub_box">
                  <h2 className="sub_head_txt">Key Achievements</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.key_desc }}
                    className="doc_para"
                  />
                  <div>
                    <button
                      className="doc_btn_one btn__two"
                      onClick={togglePopup}
                    >
                      {item.btn_one}
                    </button>
                    <button className="doc_btn_two btn__anim">
                      <Link href={item.btn_two_url} target="_blank">
                        {item.btn_two}
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Doctors;
