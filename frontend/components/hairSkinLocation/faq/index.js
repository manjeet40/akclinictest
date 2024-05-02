import { useState } from "react";
import Link from "next/link";

const LocationFaq = ({ props }) => {
  const [activeAccordionId, setActiveAccordionId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="l__faq__main">
      <div className="container">
        <div className="l__faq__heading__box">
          <h2 className="title">{props?.title}</h2>
          <p className="desc">{props?.desc}</p>
        </div>

        <div className="l__faq__boxes laser_used_accordions">
          <div className="row">
            {props?.faqs &&
              props?.faqs.map((item, id) => {
                return (
                  <div className="col-lg-6 col-md-12" key={id}>
                    <div
                      className={`faq ${
                        activeAccordionId === id ? "open" : "close"
                      }`}
                    >
                      <div
                        className="faq_q"
                        onClick={() => toggleAccordion(id)}
                      >
                        <span className="ques_main l__faq__ques">
                          {item.question}
                        </span>
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
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                        <Link href={item.url} target="_blank">
                          <button className="faq__btn btn__anim">
                            {item.btn}
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
    </div>
  );
};

export default LocationFaq;
