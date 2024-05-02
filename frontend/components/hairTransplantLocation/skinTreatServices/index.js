import React, { useEffect, useState } from "react";
import Image from "next/image";

const SkinServices = ({ props }) => {
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    // Handle initial state or refresh behavior
    setActiveSection(1);
  }, []);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="l__skin__treat__services skin__treat__services__desktop">
      <div className="container">
        <div className="l_skintreat__top">
          <h2 className="title">{props?.title}</h2>
          <p className="desc">{props?.desc}</p>
        </div>

        <div className="l__hideshow__box">
          <div className="l__btns">
            <button
              onClick={() => handleButtonClick(1)}
              className={
                activeSection === 1
                  ? "l__skin__active d__active"
                  : "l__skin__btn d__font__size"
              }
            >
              {props?.hide_box_one?.btn_one}
            </button>
            <button
              onClick={() => handleButtonClick(2)}
              className={
                activeSection === 2
                  ? "l__skin__active d__active"
                  : "l__skin__btn d__font__size"
              }
            >
              {props?.hide_box_two?.btn_two}
            </button>
            <button
              onClick={() => handleButtonClick(3)}
              className={
                activeSection === 3
                  ? "l__skin__active d__active"
                  : "l__skin__btn d__font__size"
              }
            >
              {props?.hide_box_three?.btn_three}
            </button>
            <button
              onClick={() => handleButtonClick(4)}
              className={
                activeSection === 4
                  ? "l__skin__active d__active"
                  : "l__skin__btn d__font__size"
              }
            >
              {props?.hide_box_four?.btn_four}
            </button>
            <button
              onClick={() => handleButtonClick(5)}
              className={
                activeSection === 5
                  ? "l__skin__active d__active"
                  : "l__skin__btn d__font__size"
              }
            >
              {props?.hide_box_five?.btn_five}
            </button>
            <button
              onClick={() => handleButtonClick(6)}
              className={
                activeSection === 6
                  ? "l__skin__active d__active"
                  : "l__skin__btn d__font__size"
              }
            >
              {props?.hide_box_six?.btn_six}
            </button>
          </div>

          <div className="l__contents">
            {activeSection === 1 && (
              <div className="box">
                <div className="content">
                  <Image
                    width={200}
                    height={200}
                    src={props?.hide_box_one?.img}
                  />
                  <p className="desc">{props?.hide_box_one?.desc}</p>
                  <h6 className="btn btn__anim">{props?.hide_box_one?.btn}</h6>
                </div>
              </div>
            )}

            {activeSection === 2 && (
              <div className="box">
                <div className="content">
                  <Image
                    width={200}
                    height={200}
                    src={props?.hide_box_two?.img}
                  />
                  <p className="desc">{props?.hide_box_two?.desc}</p>
                  <h6 className="btn btn__anim">{props?.hide_box_two?.btn}</h6>
                </div>
              </div>
            )}

            {activeSection === 3 && (
              <div className="box">
                <div className="content">
                  <Image
                    width={200}
                    height={200}
                    src={props?.hide_box_three?.img}
                  />
                  <p className="desc">{props?.hide_box_three?.desc}</p>
                  <h6 className="btn btn__anim">
                    {props?.hide_box_three?.btn}
                  </h6>
                </div>
              </div>
            )}

            {activeSection === 4 && (
              <div className="box">
                <div className="content">
                  <Image
                    width={200}
                    height={200}
                    src={props?.hide_box_four?.img}
                  />
                  <p className="desc">{props?.hide_box_four?.desc}</p>
                  <h6 className="btn btn__anim">{props?.hide_box_four?.btn}</h6>
                </div>
              </div>
            )}

            {activeSection === 5 && (
              <div className="box">
                <div className="content">
                  <Image
                    width={200}
                    height={200}
                    src={props?.hide_box_five?.img}
                  />
                  <p className="desc">{props?.hide_box_five?.desc}</p>
                  <h6 className="btn btn__anim">{props?.hide_box_five?.btn}</h6>
                </div>
              </div>
            )}

            {activeSection === 6 && (
              <div className="box">
                <div className="content">
                  <Image
                    width={200}
                    height={200}
                    src={props?.hide_box_six?.img}
                  />
                  <p className="desc">{props?.hide_box_six?.desc}</p>
                  <h6 className="btn btn__anim">{props?.hide_box_six?.btn}</h6>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinServices;
