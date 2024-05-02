import { useState } from "react";

const Faq = ({ props }) => {
  const [faqId, setFaqId] = useState(null);

  const toggleAccordion = (index) => {
    setFaqId((prevId) => (prevId === index ? null : index));
  };

  return (
    <div className="faqs__hairloss__treatment">
      <div className="container hair_transplant_faqs">
        <h2 className="hairloss__faq__head">{props?.title}</h2>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <p
              className="hairloss__faq__para"
              dangerouslySetInnerHTML={{ __html: props?.desc }}
            ></p>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="row">
              {props?.faqs &&
                props?.faqs.map((item, index) => (
                  <div className="col-md-12" key={index}>
                    <div
                      className={`faq ${faqId === index ? "open" : "close"}`}
                    >
                      <div
                        className="faq_q"
                        onClick={() => toggleAccordion(index)}
                      >
                        <h6
                          className="ques_main l__faq__ques"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        ></h6>
                        <span
                          className={
                            faqId === index
                              ? "plus_icon minus_icon"
                              : "plus_icon"
                          }
                        ></span>
                      </div>
                      <div
                        className={`faq_a ${
                          faqId === index ? "open" : "closed"
                        }`}
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
