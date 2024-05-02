import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CallbackPopup from "@/components/blogSingle/popup";

const AuthorPage = ({ author, error }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    // Add logic to handle body overflow here
    document.body.style.overflow = showPopup ? "auto" : "hidden";
  };
  return (
    <div className="container">
      {showPopup && <CallbackPopup handleClose={togglePopup} />}
      <div className="banner__author__main">
        {author && author.authors && (
          <div className="banner__sub__section">
            <div className="author__bread__crums">
              <h5 className="bread__crums">
                <Link href={`/`} target="_blank">
                  {" "}
                  Home
                </Link>{" "}
                {">"}{" "}
                <Link href={`/blog`} target="_blank">
                  {" "}
                  Blog
                </Link>{" "}
                {">"}{" "}
                <span className="color">{author.authors.doctor_name}</span>
              </h5>
            </div>
          </div>
        )}
      </div>

      {author && (
        <div className="author-info">
          <div className="banner__section">
            <div className="left__box">
              <Image
                src={author.authors.image}
                alt={author.authors.doctor_name}
                width={300}
                height={300}
              />
              <h1 className="head__txt">{author.authors.doctor_name}</h1>
              <p className="para__txt">{author.authors.sub_heading}</p>
              <div className="social__icons">
                <Image
                  width={20}
                  height={20}
                  src="/author/facebook.svg"
                  alt="Facebook"
                />
                <Image
                  width={20}
                  height={20}
                  src="/author/linkedin.svg"
                  alt="LinkedIn"
                />
                <Image
                  width={20}
                  height={20}
                  src="/author/insta.svg"
                  alt="Instagram"
                />
                <Image
                  width={20}
                  height={20}
                  src="/author/youtube.svg"
                  alt="Youtube"
                />
              </div>
            </div>
            <div className="right__box">
              <h2 className="head__txt">{author.authors.title}</h2>
              <p
                className="para__txt"
                dangerouslySetInnerHTML={{
                  __html: author.authors.description,
                }}
              />
              {author.authors.button ? (
                <button className="btn__banner btn__two" onClick={togglePopup}>
                  {author.authors.button}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Display error if there is any */}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default AuthorPage;
