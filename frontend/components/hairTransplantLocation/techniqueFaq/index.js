import { useState } from "react";

const TechniqueFaq = ({ props }) => {
  const [faqId, setFaqId] = useState(null);

  const toggleAccordion = (index) => {
    setFaqId((prevId) => (prevId === index ? null : index));
  };

  return (
    <div className="tech__used__faq">
      <div className="container">
        <h2 className="title">{props?.title}</h2>
        <div className="row">
          <div className="col-lg-6 left__cont">
            <p
              className="desc"
              dangerouslySetInnerHTML={{ __html: props?.desc }}
            ></p>
            <p
              className="desc color"
              dangerouslySetInnerHTML={{ __html: props?.desc_two }}
            ></p>
          </div>
          <div className="col-lg-6">
            <div className="laser_used_accordions technique__used__faq">
              {props?.faq &&
                props?.faq.map((item, id) => (
                  <div className="accordions" key={id}>
                    <div className={`faq ${faqId === id ? "open" : "close"}`}>
                      <div
                        className="faq_q"
                        onClick={() => toggleAccordion(id)}
                      >
                        <div
                          className="ques_main l__faq__ques"
                          dangerouslySetInnerHTML={{ __html: item.ques }}
                        />

                        <span
                          className={
                            faqId === id ? "plus_icon minus_icon" : "plus_icon"
                          }
                        ></span>
                      </div>
                      <div
                        className={`faq_a ${faqId === id ? "open" : "closed"}`}
                        dangerouslySetInnerHTML={{ __html: item.ans }}
                      />
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

export default TechniqueFaq;
