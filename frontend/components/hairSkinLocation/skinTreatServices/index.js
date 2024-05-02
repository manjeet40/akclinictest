import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const SkinServices = ({ props }) => {
  const [activeSection, setActiveSection] = useState(1);
  const router = useRouter();

  useEffect(() => {
    // Handle initial state or refresh behavior
    setActiveSection(1);
  }, []);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="l__skin__treat__services l__skin__treat__services__desktop">
      <div className="container">
        <div className="l_skintreat__top">
          <h2 className="title">{props?.title}</h2>
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: props?.desc }}
          />
        </div>

        <div className="l__hideshow__box">
          <div className="l__btns">
            {props?.hide_box_one?.btn_one ? (
              <button
                onClick={() => handleButtonClick(1)}
                className={
                  activeSection === 1 ? "l__skin__active" : "l__skin__btn"
                }
              >
                {props?.hide_box_one?.btn_one}
              </button>
            ) : null}

            {props?.hide_box_two?.btn_two ? (
              <button
                onClick={() => handleButtonClick(2)}
                className={
                  activeSection === 2 ? "l__skin__active" : "l__skin__btn"
                }
              >
                {props?.hide_box_two?.btn_two}
              </button>
            ) : null}

            {props?.hide_box_three?.btn_three ? (
              <button
                onClick={() => handleButtonClick(3)}
                className={
                  activeSection === 3 ? "l__skin__active" : "l__skin__btn"
                }
              >
                {props?.hide_box_three?.btn_three}
              </button>
            ) : null}

            {props?.hide_box_four?.btn_four ? (
              <button
                onClick={() => handleButtonClick(4)}
                className={
                  activeSection === 4 ? "l__skin__active" : "l__skin__btn"
                }
              >
                {props?.hide_box_four?.btn_four}
              </button>
            ) : null}

            {props?.hide_box_five?.btn_five ? (
              <button
                onClick={() => handleButtonClick(5)}
                className={
                  activeSection === 5 ? "l__skin__active" : "l__skin__btn"
                }
              >
                {props?.hide_box_five?.btn_five}
              </button>
            ) : null}

            {props?.hide_box_six?.btn_six ? (
              <button
                onClick={() => handleButtonClick(6)}
                className={
                  activeSection === 6 ? "l__skin__active" : "l__skin__btn"
                }
              >
                {props?.hide_box_six?.btn_six}
              </button>
            ) : null}

            {props?.hide_box_six?.btn_seven ? (
              <button
                onClick={() => handleButtonClick(7)}
                className={
                  activeSection === 7 ? "l__skin__active" : "l__skin__btn"
                }
              >
                {props?.hide_box_six?.btn_seven}
              </button>
            ) : null}
          </div>

          <div className="l__contents">
            {activeSection === 1 && (
              <div className="box">
                <div className="content">
                  {props?.hide_box_one?.img ? (
                    <Image
                      width={200}
                      height={200}
                      src={props?.hide_box_one?.img}
                    />
                  ) : null}
                  <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: props?.hide_box_one?.desc,
                    }}
                  ></p>
                  <h6 className="btn btn__anim">
                    <Link href={props?.hide_box_one?.url} target="blank">
                      {props?.hide_box_one?.btn}
                    </Link>
                  </h6>
                </div>
              </div>
            )}

            {activeSection === 2 && (
              <div className="box">
                <div className="content">
                  {props?.hide_box_two?.img ? (
                    <Image
                      width={200}
                      height={200}
                      src={props?.hide_box_two?.img}
                    />
                  ) : null}
                  <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: props?.hide_box_two?.desc,
                    }}
                  ></p>
                  <h6 className="btn btn__anim">
                    <Link href={props?.hide_box_two?.url} target="blank">
                      {props?.hide_box_two?.btn}
                    </Link>
                  </h6>
                </div>
              </div>
            )}

            {activeSection === 3 && (
              <div className="box">
                <div className="content">
                  {props?.hide_box_three?.img ? (
                    <Image
                      width={200}
                      height={200}
                      src={props?.hide_box_three?.img}
                    />
                  ) : null}
                  <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: props?.hide_box_three?.desc,
                    }}
                  ></p>
                  <h6 className="btn btn__anim">
                    <Link
                      href={props?.hide_box_three?.url}
                      target="blank"
                    ></Link>
                    {props?.hide_box_three?.btn}
                  </h6>
                </div>
              </div>
            )}

            {activeSection === 4 && (
              <div className="box">
                <div className="content">
                  {props?.hide_box_four?.img ? (
                    <Image
                      width={200}
                      height={200}
                      src={props?.hide_box_four?.img}
                    />
                  ) : null}
                  <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: props?.hide_box_four?.desc,
                    }}
                  ></p>
                  <h6 className="btn btn__anim">
                    <Link href={props?.hide_box_four?.url} target="blank">
                      {props?.hide_box_four?.btn}
                    </Link>
                  </h6>
                </div>
              </div>
            )}

            {activeSection === 5 && (
              <div className="box">
                <div className="content">
                  {props?.hide_box_five?.img ? (
                    <Image
                      width={200}
                      height={200}
                      src={props?.hide_box_five?.img}
                    />
                  ) : null}
                  <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: props?.hide_box_five?.desc,
                    }}
                  ></p>
                  <h6 className="btn btn__anim">
                    <Link href={props?.hide_box_five?.url} target="blank">
                      {props?.hide_box_five?.btn}
                    </Link>
                  </h6>
                </div>
              </div>
            )}

            {activeSection === 6 && (
              <div className="box">
                <div className="content">
                  {props?.hide_box_six?.img ? (
                    <Image
                      width={200}
                      height={200}
                      src={props?.hide_box_six?.img}
                    />
                  ) : null}
                  <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: props?.hide_box_six?.desc,
                    }}
                  ></p>
                  <h6 className="btn btn__anim">
                    <Link href={props?.hide_box_six?.url} target="blank">
                      {props?.hide_box_six?.btn}
                    </Link>
                  </h6>
                </div>
              </div>
            )}

            {activeSection === 7 && (
              <div className="box">
                <div className="content">
                  {props?.hide_box_seven?.img ? (
                    <Image
                      width={200}
                      height={200}
                      src={props?.hide_box_seven?.img}
                    />
                  ) : null}
                  <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: props?.hide_box_seven?.desc,
                    }}
                  ></p>
                  <h6 className="btn btn__anim">
                    <Link href={props?.hide_box_seven?.url} target="blank">
                      {props?.hide_box_seven?.btn}
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

export default SkinServices;
