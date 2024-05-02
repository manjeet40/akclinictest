import Image from "next/image";
import React, { useEffect, useState } from "react";

const DoctorsAchievements = ({ props }) => {
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    // Handle initial state or refresh behavior
    setActiveSection(1);
  }, []);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="container">
      <div className="achievements__main">
        <h2
          className="achieve__title"
          dangerouslySetInnerHTML={{ __html: props?.title }}
        ></h2>
        <div
          className="key__achieve__para"
          dangerouslySetInnerHTML={{ __html: props?.achieve_para }}
        />
        <div className="doc__key__achieve">
          <div className="row">
            <div className="col-lg-4">
              <button
                onClick={() => handleButtonClick(1)}
                className={
                  activeSection === 1
                    ? "observ__active first__btn__width"
                    : "observ__btn first__btn__width"
                }
              >
                {props?.first_box?.btn_one}
              </button>
            </div>
            <div className="col-lg-4">
              <button
                onClick={() => handleButtonClick(2)}
                className={
                  activeSection === 2
                    ? "observ__active first__btn__width"
                    : "observ__btn first__btn__width"
                }
              >
                {props?.second_box?.btn_second}
              </button>
            </div>
            <div className="col-lg-4">
              <button
                onClick={() => handleButtonClick(3)}
                className={
                  activeSection === 3
                    ? "observ__active first__btn__width"
                    : "observ__btn first__btn__width"
                }
              >
                {props?.third_box?.btn_third}
              </button>
            </div>
          </div>
        </div>

        <div className="key__achieve__hide__box">
          {activeSection === 1 && (
            <div className="key__achieve__content">
              <div className="key__list">
                {props?.first_box?.list &&
                  props?.first_box?.list.map((item, id) => {
                    return (
                      <div key={id}>
                        <h2>{item.heading}</h2>
                        <ul>
                          <li>{item.li}</li>
                        </ul>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {activeSection === 2 && (
            <div className="key__achieve__content">
              <div className="key__list">
                {props?.second_box?.list &&
                  props?.second_box?.list.map((item, id) => {
                    return (
                      <div key={id}>
                        <h2>{item.heading}</h2>
                        <ul>
                          <li>{item.li}</li>
                        </ul>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {activeSection === 3 && (
            <div className="key__achieve__content">
              <div className="key__list">
                {props?.third_box?.list &&
                  props?.third_box?.list.map((item, id) => {
                    return (
                      <div key={id}>
                        <h2>{item.heading}</h2>
                        <ul>
                          <li>{item.li}</li>
                        </ul>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="award_sec kapil__dua__awards">
        <div className="award">
          <h2
            className="awrd_h wow fadeInUp awards__title"
            dangerouslySetInnerHTML={{ __html: props?.awards?.title }}
          ></h2>
          <div
            className="awrd_p wow fadeInUp awards__para"
            dangerouslySetInnerHTML={{ __html: props?.awards?.desc }}
          ></div>
        </div>
        <div className="row img__hover__anim">
          {props?.awards?.images &&
            props?.awards?.images.map((item, id) => {
              return (
                <div className="col-md-2 img__hover" key={id}>
                  <div className="image_sec_awrd">
                    <Image src={item.img} width={150} height={75} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DoctorsAchievements;
