import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const howWeDoIt = ({ props }) => {
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
  const router = useRouter();
  return (
    <div className="how_we_do">
      <div className="container">
        <div className="achi_dtl">
          <h2 className="team_h1 wow fadeInUp txt-center">
            {props?.main_title}
          </h2>
        </div>
        <div className="row how_mt10 flex">
          <div className="col-lg-6 col-md-12 col-sm-12 mt__20">
            <h3 className="head_txt_how">{props?.title}</h3>
            <p
              className="para_txt_how"
              dangerouslySetInnerHTML={{ __html: props?.description }}
            />
            <button
              className="btn_how btn__two"
              onClick={() => router.push(`${props?.button?.url}`)}
            >
              {props?.button?.text}
            </button>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <Image
              width={1000}
              height={1000}
              src={props?.image}
              alt="Image"
              className="how__img"
              onClick={() => openVideo(props.video_url)}
            />
          </div>
        </div>
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
  );
};

export default howWeDoIt;
