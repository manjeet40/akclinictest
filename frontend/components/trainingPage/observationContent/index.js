import React, { useState } from "react";

const ObservContent = ({ firstBox, secondBox, thirdBox }) => {
  const [activeSection, setActiveSection] = useState(1);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="observ_cont_main">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 observ_border_flex first__width__observ">
            <button
              onClick={() => handleButtonClick(1)}
              className={`observ__btn first__btn__width ${
                activeSection === 1 ? "observ__active" : ""
              }`}
            >
              {firstBox?.title_one}
            </button>
            <div className="border__right"></div>
          </div>
          <div className="col-lg-4 observ_border_flex">
            <button
              onClick={() => handleButtonClick(2)}
              className={`observ__btn second__btn__width ${
                activeSection === 2 ? "observ__active" : ""
              }`}
            >
              {secondBox?.title_two}
            </button>
            <div className="border__right border__right__second"></div>
          </div>
          <div className="col-lg-4">
            <button
              onClick={() => handleButtonClick(3)}
              className={`observ__btn ${
                activeSection === 3 ? "observ__active" : ""
              }`}
            >
              {thirdBox?.title_three}
            </button>
          </div>
        </div>

        <div className="hide__show__box">
          <div
            className={`box__main ${activeSection === 1 ? "box_visible" : ""}`}
          >
            {firstBox && (
              <>
                <div className="para__box">
                  <p
                    className="para__txt"
                    dangerouslySetInnerHTML={{ __html: firstBox.para_text }}
                  />
                </div>
                <div className="bottom__cont">
                  <div className="row">
                    {firstBox.ul_content &&
                      firstBox.ul_content.map((item, id) => (
                        <div className="col-lg-4" key={id}>
                          <h2 className="head__txt">{item.title}</h2>
                          <div
                            dangerouslySetInnerHTML={{ __html: item.list_one }}
                          ></div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div
            className={`box__main ${activeSection === 2 ? "box_visible" : ""}`}
          >
            {secondBox && (
              <>
                <div className="para__box">
                  <p
                    className="para__txt"
                    dangerouslySetInnerHTML={{ __html: secondBox.para_text }}
                  />
                </div>
                <div className="bottom__cont">
                  <div className="row">
                    {secondBox.ul_content &&
                      secondBox.ul_content.map((item, id) => (
                        <div className="col-lg-4" key={id}>
                          <h2 className="head__txt">{item.title}</h2>
                          <div
                            dangerouslySetInnerHTML={{ __html: item.list_two }}
                          ></div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div
            className={`box__main ${activeSection === 3 ? "box_visible" : ""}`}
          >
            {thirdBox && (
              <>
                <div className="para__box">
                  <p
                    className="para__txt"
                    dangerouslySetInnerHTML={{ __html: thirdBox.para_text }}
                  />
                </div>
                <div className="bottom__cont">
                  <div className="row">
                    {thirdBox.ul_content &&
                      thirdBox.ul_content.map((item, id) => (
                        <div className="col-lg-4" key={id}>
                          <h2 className="head__txt">{item.title}</h2>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.list_three,
                            }}
                          ></div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservContent;
