import Slider from "react-slick";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Configure the slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

// Configure the slider settings
const sliderSettingsTwo = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const NewsEvents = ({ props }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPostsFromBackend = props.news_events_blogs || [];

  const filteredPosts = fetchPostsFromBackend.filter(
    (post) =>
      post.post_title &&
      post.post_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Divide the filtered posts into chunks of three
  const chunkedPosts = [];
  for (let i = 0; i < filteredPosts.length; i += 3) {
    chunkedPosts.push(filteredPosts.slice(i, i + 3));
  }

  // Divide the filtered posts into chunks of three
  const chunkedPostsTwo = [];
  for (let i = 0; i < filteredPosts.length; i += 1) {
    chunkedPostsTwo.push(filteredPosts.slice(i, i + 1));
  }

  return (
    <div>
      <div className="blog_slider_sec blog_slider_sec__desktop">
        <div className="container">
          <div className="blog__search__box">
            <h2 className="blog_head_txt">{props?.title}</h2>
            <div className="search__box__relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search"
                className="input__search__blog"
              />
              <Image
                width={20}
                height={20}
                src="/blog/search.svg"
                alt="Search_Image"
                className="search__svg"
              />
            </div>
          </div>
          <Slider {...sliderSettings}>
            {chunkedPosts.map((chunk, index) => (
              <div key={index} className="row blog__flex">
                {chunk.map((post, innerIndex) => (
                  <div
                    key={post.id}
                    className={`col-lg-${innerIndex === 0 ? "6" : "3"} col-sm-${
                      innerIndex === 0 ? "12" : "12"
                    }`}
                  >
                    {post?.acf?.featured_image ? (
                      <Image
                        width={300}
                        height={300}
                        src={post?.acf?.featured_image}
                        alt={post?.post_title}
                        className="blog__img"
                      />
                    ) : (
                      <Image
                        width={300}
                        height={300}
                        src="/ak-blog.png"
                        alt="Default Image"
                      />
                    )}
                    <p className="date__txt news__event__date">
                      {new Date(post.post_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                    </p>
                    <h3 className="blog__title event__slider__title">
                      {post?.post_title}
                    </h3>
                    {innerIndex === 0 ? (
                      <p
                        className="blog__content"
                        dangerouslySetInnerHTML={{ __html: post?.post_content }}
                      ></p>
                    ) : null}
                    <Link href={`/blog/${post.post_name}`} target="_blank">
                      <h6 className="read__more__btn btn__anim">Read More</h6>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="blog_slider_sec blog_slider_sec__mobile">
        <div className="container">
          <div className="blog__search__box">
            <h2 className="blog_head_txt">{props?.slideData?.title}</h2>
            <div className="search__box__relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search"
                className="input__search__blog"
              />
              <Image
                width={20}
                height={20}
                src="/blog/search.svg"
                alt="Search_Image"
                className="search__svg"
              />
            </div>
          </div>
          <Slider {...sliderSettingsTwo}>
            {chunkedPostsTwo.map((chunk, index) => (
              <div key={index} className="row blog__flex">
                {chunk.map((post, innerIndex) => (
                  <div
                    key={post.id}
                    className={`col-lg-${innerIndex === 0 ? "6" : "3"} col-sm-${
                      innerIndex === 0 ? "12" : "12"
                    }`}
                  >
                    <Image
                      width={300}
                      height={300}
                      src={post?.acf?.featured_image}
                      alt="blog_img"
                      className="blog__img"
                    />
                    <p className="date__txt" style={{ paddingTop: "10px" }}>
                      {new Date(post.post_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h3
                      className="blog__title"
                      dangerouslySetInnerHTML={{ __html: post.post_title }}
                    />
                    {innerIndex === 0 ? (
                      <p
                        className="blog__content"
                        dangerouslySetInnerHTML={{ __html: post?.post_content }}
                      ></p>
                    ) : null}
                    <Link href={`/blog/${post.post_name}`} target="_blank">
                      <h6 className="read__more__btn btn__anim">Read more</h6>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default NewsEvents;
