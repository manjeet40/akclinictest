import { useState } from "react";
import { useRouter } from "next/router";

const FaqTransplant = ({ props }) => {
  const [activeAccordionId, setActiveAccordionId] = useState(null);
  const router = useRouter();

  const toggleAccordion = (id) => {
    setActiveAccordionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="l__faq__main" style={{ background: "#FFF" }}>
      <div className="container">
        <div className="l__faq__heading__box">
          <h2 className="title">{props?.title}</h2>
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: props?.desc }}
          ></p>
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
                        <div
                          className="ques_main l__faq__ques"
                          dangerouslySetInnerHTML={{ __html: item.question }}
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
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                          className="faq_a"
                        />
                        {item.btn ? (
                          <button
                            class="faq__btn"
                            onClick={() => router.push(`${item.url}`)}
                          >
                            {item.btn}
                          </button>
                        ) : null}
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

export default FaqTransplant;
