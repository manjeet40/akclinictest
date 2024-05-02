import { useState } from "react";
import Link from "next/link";

const HairTransplantType = ({ props }) => {
  const [activeAccordionId, setActiveAccordionId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="hair_type">
      <div className="container">
        <div className="col-lg-6 col-md-8">
          <div className="hair_text_sec">
            <h2 className="text_h">{props?.title}</h2>
            <p
              className="text_para_h hair__transplant__type__para"
              dangerouslySetInnerHTML={{ __html: props?.description }}
            ></p>
          </div>
        </div>
        <div className="row">
          {props?.types &&
            props?.types.map((item, id) => {
              return (
                <div className="col-lg-6 col-md-12" key={id}>
                  <div
                    className={`faq ${
                      activeAccordionId === id ? "open" : "close"
                    }`}
                  >
                    <div className="faq_q" onClick={() => toggleAccordion(id)}>
                      <div
                        className="ques_main"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                      <span
                        className={
                          activeAccordionId === id
                            ? "plus_icon minus_icon"
                            : "plus_icon"
                        }
                      ></span>
                    </div>
                    <div
                      className={`faq_a ${
                        activeAccordionId === id ? "open" : "closed"
                      }`}
                    >
                      <div
                        className="faq__txt"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                      <Link href={item.url} target="_blank">
                        <button className="faq__btn btn__anim">
                          {item.button}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HairTransplantType;
