import Image from "next/image";

const ourJourney = ({ props }) => {
  return (
    <div className="container">
      <div className="our__journey__main__section">
        <h2 className="journey__head__txt">{props?.heading_main}</h2>

        <div className="our__journey__sub__section">
          <div className="journey__border"></div>

          <div className="content__section">
            <div className="boxe__s">
              <div className="sub__first__box">
                <h3 className="head__txt">{props?.box_one?.title}</h3>
                <div className="bo__x">
                  <h5 className="num__big">{props?.box_one?.number}</h5>
                  <Image
                    width={200}
                    height={200}
                    src="/about-us/j1.png"
                    alt="Img"
                  />
                  <div className="content__box">
                    <div
                      className="par__a"
                      dangerouslySetInnerHTML={{
                        __html: props?.box_one?.para_text,
                      }}
                    />
                    <h3 className="nu__m">{props?.box_one?.year}</h3>
                  </div>
                </div>
              </div>

              <div className="sub__first__box secon__d">
                <div className="bo__x bo__x2">
                  <h5 className="num__big">{props?.box_two?.number}</h5>
                  <Image
                    width={200}
                    height={200}
                    src="/about-us/j2.png"
                    alt="Img"
                  />
                  <div className="content__box__second">
                    <div
                      className="par__a"
                      dangerouslySetInnerHTML={{
                        __html: props?.box_two?.para_text,
                      }}
                    />
                    <h3 className="nu__m">{props?.box_two?.year}</h3>
                  </div>
                </div>
                <h4 className="head__txt second__head__txt">
                  {props?.box_two?.title}
                </h4>
              </div>

              <div className="sub__first__box thir__d">
                <h4 className="head__txt"> {props?.box_three?.title}</h4>
                <div className="bo__x">
                  <h5 className="num__big">{props?.box_three?.number}</h5>
                  <Image
                    width={200}
                    height={200}
                    src="/about-us/j1.png"
                    alt="Img"
                  />
                  <div className="content__box">
                    <div
                      className="par__a"
                      dangerouslySetInnerHTML={{
                        __html: props?.box_three?.para_text,
                      }}
                    />
                    <h3 className="nu__m">{props?.box_three?.year}</h3>
                  </div>
                </div>
              </div>

              <div className="sub__first__box fort__h">
                <div className="bo__x bo__x2">
                  <h5 className="num__big">{props?.box_four?.number}</h5>
                  <Image
                    width={200}
                    height={200}
                    src="/about-us/j2.png"
                    alt="Img"
                  />
                  <div className="content__box__second">
                    <div
                      className="par__a"
                      dangerouslySetInnerHTML={{
                        __html: props?.box_four?.para_text,
                      }}
                    />
                    <h3 className="nu__m">{props?.box_four?.year}</h3>
                  </div>
                </div>
                <h4 className="head__txt second__head__txt">
                  {props?.box_four?.title}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ourJourney;
