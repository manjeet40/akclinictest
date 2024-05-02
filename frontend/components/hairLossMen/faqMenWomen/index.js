import { useState } from "react";
import { useRouter } from "next/router";

const faqMenWomen = ({ props }) => {
  const [activeAccordionId, setActiveAccordionId] = useState(null);
  const router = useRouter();

  const toggleAccordion = (id) => {
    setActiveAccordionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="hair_type hairloss__mw">
      <div className="container">
        <div className="col-lg-12 col-md-12">
          <div className="hair_text_sec">
            <h2 className="text_h hairloss__head__faq">{props?.title}</h2>
          </div>
        </div>
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
                    <div className="faq_q" onClick={() => toggleAccordion(id)}>
                      <h6
                        className="ques_main l__faq__ques"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      ></h6>
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
                      <p dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                      {item?.btn ? (
                        <h6
                          className="btn btn__anim"
                          onClick={() => router.push(`${item.url}`)}
                        >
                          {item?.btn}
                        </h6>
                      ) : null}
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

export default faqMenWomen;
