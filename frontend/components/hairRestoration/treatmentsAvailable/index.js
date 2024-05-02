import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Content = ({ props }) => {
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    // Handle initial state or refresh behavior
    setActiveSection(1);
  }, []);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="treatments__available__main treatments__available__main__desktop">
      <div className="container">
        <h2 className="treatments__head__txt">{props?.title}</h2>
        <div className="treatments__flex">
          <div className="row treatments__btns">
            <div className="col-lg-12">
              <button
                onClick={() => handleButtonClick(1)}
                className={
                  activeSection === 1 ? "treatments__active" : "treatments__btn"
                }
                dangerouslySetInnerHTML={{
                  __html: props?.hide_show_btn?.btn_one,
                }}
              ></button>
            </div>
            <div className="col-lg-12">
              <button
                onClick={() => handleButtonClick(2)}
                className={
                  activeSection === 2 ? "treatments__active" : "treatments__btn"
                }
                dangerouslySetInnerHTML={{
                  __html: props?.hide_show_btn?.btn_two,
                }}
              ></button>
            </div>
            <div className="col-lg-12">
              <button
                onClick={() => handleButtonClick(3)}
                className={
                  activeSection === 3 ? "treatments__active" : "treatments__btn"
                }
                dangerouslySetInnerHTML={{
                  __html: props?.hide_show_btn?.btn_three,
                }}
              ></button>
            </div>
            <div className="col-lg-12">
              <button
                onClick={() => handleButtonClick(4)}
                className={
                  activeSection === 4 ? "treatments__active" : "treatments__btn"
                }
                dangerouslySetInnerHTML={{
                  __html: props?.hide_show_btn?.btn_four,
                }}
              ></button>
            </div>
            <div className="col-lg-12">
              <button
                onClick={() => handleButtonClick(5)}
                className={
                  activeSection === 5 ? "treatments__active" : "treatments__btn"
                }
                dangerouslySetInnerHTML={{
                  __html: props?.hide_show_btn?.btn_five,
                }}
              ></button>
            </div>
          </div>

          <div className="treatments__hide__show__box">
            {activeSection === 1 && (
              <div className="box__mains">
                <div className="treat__para">
                  {props?.btn_boxes?.btn_one_box?.img ? (
                    <Image
                      width={300}
                      height={300}
                      src={props?.btn_boxes?.btn_one_box?.img}
                      alt="Image"
                    />
                  ) : null}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props?.btn_boxes?.btn_one_box?.desc,
                    }}
                    className="treatments__decs"
                  ></div>
                  <h6 className="btn__anim">
                    <Link
                      href={props?.btn_boxes?.btn_one_box?.url}
                      target="blank"
                    >
                      {props?.btn_boxes?.btn_one_box?.btn}
                    </Link>
                  </h6>
                </div>
              </div>
            )}

            {activeSection === 2 && (
              <div className="box__mains">
                <div className="treat__para">
                  {props?.btn_boxes?.btn_two_box?.img ? (
                    <Image
                      width={300}
                      height={300}
                      src={props?.btn_boxes?.btn_two_box?.img}
                      alt="Image"
                    />
                  ) : null}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props?.btn_boxes?.btn_two_box?.desc,
                    }}
                    className="treatments__decs"
                  ></div>
                  <h6 className="btn__anim">
                    <Link
                      href={props?.btn_boxes?.btn_two_box?.url}
                      target="blank"
                    >
                      {props?.btn_boxes?.btn_two_box?.btn}
                    </Link>
                  </h6>
                </div>
              </div>
            )}

            {activeSection === 3 && (
              <div className="box__mains">
                <div className="treat__para">
                  {props?.btn_boxes?.btn_three_box?.img ? (
                    <Image
                      width={300}
                      height={300}
                      src={props?.btn_boxes?.btn_three_box?.img}
                      alt="Image"
                    />
                  ) : null}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props?.btn_boxes?.btn_three_box?.desc,
                    }}
                    className="treatments__decs"
                  ></div>
                  <h6 className="btn__anim">
                    <Link
                      href={props?.btn_boxes?.btn_three_box?.url}
                      target="blank"
                    >
                      {props?.btn_boxes?.btn_three_box?.btn}
                    </Link>
                  </h6>
                </div>
              </div>
            )}

            {activeSection === 4 && (
              <div className="box__mains">
                <div className="treat__para">
                  {props?.btn_boxes?.btn_four_box?.img ? (
                    <Image
                      width={300}
                      height={300}
                      src={props?.btn_boxes?.btn_four_box?.img}
                      alt="Image"
                    />
                  ) : null}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props?.btn_boxes?.btn_four_box?.desc,
                    }}
                    className="treatments__decs"
                  ></div>
                  <h6 className="btn__anim">
                    <Link
                      href={props?.btn_boxes?.btn_four_box?.url}
                      target="blank"
                    >
                      {props?.btn_boxes?.btn_four_box?.btn}
                    </Link>
                  </h6>
                </div>
              </div>
            )}

            {activeSection === 5 && (
              <div className="box__mains">
                <div className="treat__para">
                  {props?.btn_boxes?.btn_five_box?.img ? (
                    <Image
                      width={300}
                      height={300}
                      src={props?.btn_boxes?.btn_five_box?.img}
                      alt="Image"
                    />
                  ) : null}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props?.btn_boxes?.btn_five_box?.desc,
                    }}
                    className="treatments__decs"
                  ></div>
                  <h6 className="btn__anim">
                    <Link
                      href={props?.btn_boxes?.btn_five_box?.url}
                      target="blank"
                    >
                      {props?.btn_boxes?.btn_five_box?.btn}
                    </Link>
                  </h6>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
