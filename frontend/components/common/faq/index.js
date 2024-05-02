import { useState, useEffect } from "react";
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

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = `
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          ${props?.faq
            .map(
              (item, index) => `{
            "@type": "Question",
            "name": "${item.question}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "${item.answer}"
            }
          }`
            )
            .join(",")}
        ]
      }
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [props?.faq]);

  return (
    <div className="faqs">
      <div className="container hair_transplant_faqs">
        <h2 className="team_h1" style={{ textTransform: "capitalize" }}>
          {props?.title}
        </h2>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <Image
              width={1000}
              height={1000}
              src={props?.image}
              alt="Image"
              className="faq_img_hair_transplant"
            />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="row">
              {props?.faq.slice(0, visibleAccordions).map((item, index) => (
                <div className="col-md-12" key={index}>
                  <div className={`faq ${faqId === index ? "open" : "close"}`}>
                    <div
                      className="faq_q"
                      onClick={() => toggleAccordion(index)}
                    >
                      <div
                        className="ques_main"
                        dangerouslySetInnerHTML={{ __html: item.question }}
                      />
                      <span
                        className={
                          faqId === index ? "plus_icon minus_icon" : "plus_icon"
                        }
                      ></span>
                    </div>

                    <div
                      className={`faq_a ${faqId === index ? "open" : "closed"}`}
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                </div>
              ))}

              {!isExpanded && props?.faq.length > visibleAccordions && (
                <div className="view_all_btn btn__two" onClick={toggleViewMore}>
                  View All
                </div>
              )}

              {isExpanded &&
                props?.faq.slice(visibleAccordions).map((item, index) => (
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
                        <div
                          className="ques_main"
                          dangerouslySetInnerHTML={{ __html: item.question }}
                        />
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
                        dangerouslySetInnerHTML={{ __html: item.answer }}
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

export default Faq;
