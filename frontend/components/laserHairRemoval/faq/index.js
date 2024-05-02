import { useState } from "react";
import Image from "next/image";

const Faq = ({ props }) => {
  const [visibleAccordions, setVisibleAccordions] = useState(5);
  const [isExpanded, setIsExpanded] = useState(false);
  const [faqId, setFaqId] = useState(null);

  const toggleAccordion = (index) => {
    setFaqId((prevId) => (prevId === index ? null : index));
  };

  const toggleViewMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="faqs">
      <div className="container hair_transplant_faqs">
        <h2 className="team_h1">{props?.title}</h2>
        <div className="row">
          <div className="col-md-6">
            <Image
              width={400}
              height={400}
              src={props?.image}
              alt="Image"
              className="faq_img_hair_transplant"
            />
          </div>
          <div className="col-md-6">
            <div className="row">
              {props?.questions
                .slice(0, visibleAccordions)
                .map((item, index) => (
                  <div className="col-md-12" key={index}>
                    <div
                      className={`faq ${faqId === index ? "open" : "close"}`}
                    >
                      <div
                        className="faq_q"
                        onClick={() => toggleAccordion(index)}
                      >
                        <h5 className="ques_main">{item.questions}</h5>
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
                      >
                        {item.answer}
                      </div>
                    </div>
                  </div>
                ))}

              {!isExpanded && props?.questions.length > visibleAccordions && (
                <div className="view_all_btn btn__two" onClick={toggleViewMore}>
                  View All
                </div>
              )}

              {isExpanded &&
                props?.questions.slice(visibleAccordions).map((item, index) => (
                  <div className="col-md-12" key={index + visibleAccordions}>
                    <div
                      className={`faq ${
                        faqId === index + visibleAccordions ? "open" : "close"
                      }`}
                    >
                      <div
                        className="faq_q"
                        onClick={() =>
                          toggleAccordion(index + visibleAccordions)
                        }
                      >
                        <span className="ques_main">{item.questions}</span>
                        <span
                          className={
                            faqId === index + visibleAccordions
                              ? "plus_icon minus_icon"
                              : "plus_icon"
                          }
                        ></span>
                      </div>
                      <div
                        className={`faq_a ${
                          faqId === index + visibleAccordions
                            ? "open"
                            : "closed"
                        }`}
                      >
                        {item.answer}
                      </div>
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
