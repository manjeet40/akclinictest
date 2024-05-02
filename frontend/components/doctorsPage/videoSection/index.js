import React, { useState, useEffect } from "react";
import Image from "next/image";

const Video = ({ props }) => {
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

  function extractVideoId(url) {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  }

  return (
    <div className="container">
      <div className="dr__video__section">
        <h2 className="title">{props?.title}</h2>

        <div className="row">
          {props?.video_boxes &&
            props?.video_boxes.map((item, id) => {
              return (
                <div className="col-lg-3 doc__video__box" key={id}>
                  <div className="imgBox">
                    <Image
                      src={item.img}
                      width={300}
                      height={300}
                      alt={item.title}
                      onClick={() => openVideo(item.video_url)}
                      className="men__img"
                    />

                    <Image
                      src={`/doc-single/play.png`}
                      width={100}
                      height={100}
                      alt="Play Svg"
                      className="playSvg"
                      onClick={() => openVideo(item.video_url)}
                    />
                  </div>
                  <h5 className="date">{item.date}</h5>
                  <h3 className="title">{item.title}</h3>
                </div>
              );
            })}
        </div>

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

export default Video;
