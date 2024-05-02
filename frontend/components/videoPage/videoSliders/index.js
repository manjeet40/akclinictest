import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";

const VideoData = ({ props }) => {
  const [selectedBox, setSelectedBox] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSliderItems, setFilteredSliderItems] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState("");

  const getVideoIdFromUrl = (url) => {
    const videoIdMatch = url.match(
      /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const openVideo = (url) => {
    const id = getVideoIdFromUrl(url);
    if (id) {
      setVideoId(id);
      setShowVideo(true);
    } else {
      console.error("Invalid YouTube URL");
    }
  };

  const closeVideo = () => {
    setShowVideo(false);
    setVideoId("");
  };

  useEffect(() => {
    // Function to toggle body overflow
    const toggleBodyOverflow = () => {
      if (showVideo) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    toggleBodyOverflow();

    // Clean up by restoring the default overflow setting when unmounting or when showVideo changes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showVideo]);

  // Update the filteredSliderItems when a new search term is applied
  useEffect(() => {
    if (searchTerm) {
      const filteredItems = props.flatMap((box) =>
        box?.slider_items.filter((item) =>
          item?.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredSliderItems(filteredItems);
    } else {
      setFilteredSliderItems([]);
    }
  }, [searchTerm]);

  const handleBoxChange = (event) => {
    const selectedBoxId = event.target.value;
    setSelectedBox(selectedBoxId);
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextsArrow />,
    prevArrow: <SamplePrevsArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function SampleNextsArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <Image src="/arrow_r.svg" width={56} height={56} />
      </div>
    );
  }

  function SamplePrevsArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <Image src="/arrow_l.svg" width={56} height={56} />
      </div>
    );
  }

  function extractVideoId(url) {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  }

  return (
    <div className="container">
      <div className="videos__main">
        <div className="videos__filter__box">
          <h3 className="heading__txt">Filter By</h3>
          <div className="select__box">
            <select onChange={handleBoxChange} className="select__options">
              <option value="">Show All</option>
              {props &&
                props.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <g clip-path="url(#clip0_2590_5159)">
                <path
                  d="M12.0007 13.6719L16.9507 8.72192L18.3647 10.1359L12.0007 16.4999L5.63672 10.1359L7.05072 8.72192L12.0007 13.6719Z"
                  fill="#F47920"
                />
              </g>
              <defs>
                <clipPath id="clip0_2590_5159">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="search__box">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search__field"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <g clip-path="url(#clip0_2590_5164)">
                <path
                  d="M18.031 17.117L22.314 21.399L20.899 22.814L16.617 18.531C15.0237 19.8082 13.042 20.5029 11 20.5C6.032 20.5 2 16.468 2 11.5C2 6.532 6.032 2.5 11 2.5C15.968 2.5 20 6.532 20 11.5C20.0029 13.542 19.3082 15.5237 18.031 17.117ZM16.025 16.375C17.2941 15.0699 18.0029 13.3204 18 11.5C18 7.632 14.867 4.5 11 4.5C7.132 4.5 4 7.632 4 11.5C4 15.367 7.132 18.5 11 18.5C12.8204 18.5029 14.5699 17.7941 15.875 16.525L16.025 16.375Z"
                  fill="#636466"
                />
              </g>
              <defs>
                <clipPath id="clip0_2590_5164">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div className="row videos__slider__main">
          {searchTerm || selectedBox === ""
            ? filteredSliderItems.map((item, index) => (
                <div className="col-lg-3">
                  <div key={index} className="slider__boxes">
                    <div className="video__img__box">
                      {/* <iframe
                        title="YouTube Video"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${extractVideoId(
                          item.video_url
                        )}`}
                        frameBorder="0"
                        allowFullScreen
                        className="video__popup__iframe"
                      ></iframe> */}
                      <Image
                        src={item.img}
                        width={300}
                        height={400}
                        alt={item.title}
                        onClick={() => openVideo(item.video_url)}
                        className="img__main"
                      />
                      <Image
                        src={`/doc-single/play.png`}
                        width={100}
                        height={100}
                        alt="Play Svg"
                        className="svg__play"
                        onClick={() => openVideo(item.video_url)}
                      />
                    </div>
                    <p className="date">{item.date}</p>
                    <h3 className="title">{item.title}</h3>
                  </div>
                </div>
              ))
            : props &&
              props
                .filter((item) => item?.title?.toString() === selectedBox)
                .map((item) => (
                  <div key={item.id} className="videos__slider__main">
                    <h2 className="heading__main">{item.title}</h2>
                    <Slider {...settings}>
                      {item.slider_items.map((item, index) => (
                        <div key={index} className="slider__boxes">
                          <div className="video__img__box">
                            <Image
                              src={item.img}
                              width={300}
                              height={400}
                              alt={item.title}
                              onClick={() => openVideo(item.video_url)}
                              className="img__main"
                            />
                            <Image
                              src={`/doc-single/play.png`}
                              width={100}
                              height={100}
                              alt="Play Svg"
                              className="svg__play"
                              onClick={() => openVideo(item.video_url)}
                            />
                          </div>
                          <p className="date">{item.date}</p>
                          <h3 className="title">{item.title}</h3>
                        </div>
                      ))}
                    </Slider>
                  </div>
                ))}
        </div>

        {/* Add this block to handle the case when searchTerm and selectedBox are empty */}
        {!searchTerm && selectedBox === "" && (
          <>
            {props &&
              props.map((item) => (
                <div key={item.id} className="videos__slider__main">
                  <h2 className="heading__main">{item.title}</h2>
                  <Slider {...settings}>
                    {item.slider_items.map((item, index) => (
                      <div key={index} className="slider__boxes">
                        <div className="video__img__box">
                          <Image
                            src={item.img}
                            width={300}
                            height={400}
                            alt={item.title}
                            onClick={() => openVideo(item.video_url)}
                            className="img__main"
                          />
                          <Image
                            src={`/doc-single/play.png`}
                            width={100}
                            height={100}
                            alt="Play Svg"
                            className="svg__play"
                            onClick={() => openVideo(item.video_url)}
                          />
                        </div>
                        <p className="date">{item.date}</p>
                        <h3 className="title">{item.title}</h3>
                      </div>
                    ))}
                  </Slider>
                </div>
              ))}
          </>
        )}

        {showVideo && (
          <div className="video-popup">
            <div className="video-popup-content">
              <button className="close-btn" onClick={closeVideo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 30 30"
                >
                  <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                </svg>
              </button>
              <iframe
                title="YouTube Video"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
                className="video__popup__iframe"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoData;
