import { useState } from "react";

const laserUsedFaq = ({ props }) => {
  const [faqId, setFaqId] = useState(null);

  const toggleAccordion = (id) => {
    setFaqId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="laser_used_faq">
      <div className="container">
        <div className="laser_used_faq_sub_section">
          <h2
            className="head_txt"
            dangerouslySetInnerHTML={{ __html: props?.title }}
          ></h2>
          <div className="laser_used_box">
            <div className="laser_used_content">
              <div
                className="para_txt"
                dangerouslySetInnerHTML={{ __html: props?.description }}
              />
            </div>
            <div className="laser_used_accordions">
              {props?.types &&
                props?.types.map((item, id) => (
                  <div className="col-lg-12" key={id}>
                    <div className={`faq ${faqId === id ? "open" : "close"}`}>
                      <div
                        className="faq_q"
                        onClick={() => toggleAccordion(id)}
                      >
                        <h5
                          className="ques_main"
                          style={{ textTransform: "uppercase" }}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        ></h5>
                        <span
                          className={
                            faqId === id ? "plus_icon minus_icon" : "plus_icon"
                          }
                        ></span>
                      </div>
                      <div
                        className={`faq_a ${faqId === id ? "open" : "closed"}`}
                        dangerouslySetInnerHTML={{ __html: item.description }}
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

export default laserUsedFaq;
