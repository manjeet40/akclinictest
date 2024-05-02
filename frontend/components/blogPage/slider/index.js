import Slider from "react-slick";
import React, { useState, useEffect } from "react";
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

const BlogPageSlider = ({ props, blogs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [authors, setAuthors] = useState({});

  // Sort blogs in descending order by date
  const sortedBlogs = blogs.sort(
    (a, b) => new Date(b.post_date) - new Date(a.post_date)
  );

  // Select the first 6 blogs
  const latestBlogs = sortedBlogs.slice(0, 6);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          "https://admin.akclinics.com/wp-json/wp/v2/users"
        );
        if (response.ok) {
          const data = await response.json();
          const authorDetails = {};
          data.forEach((author) => {
            // Split the name by "@" and take the first part if present
            const nameParts = author.name.split("@");
            const firstName = nameParts.length > 1 ? nameParts[0] : author.name;
            authorDetails[author.id] = firstName.trim(); // Store author first names by ID
          });
          setAuthors(authorDetails);
        } else {
          throw new Error("Failed to fetch authors");
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Divide the filtered posts into chunks of three
  const chunkedPosts = [];
  for (let i = 0; i < latestBlogs.length; i += 3) {
    chunkedPosts.push(latestBlogs.slice(i, i + 3));
  }

  // Divide the filtered posts into chunks of three
  const chunkedPostsTwo = [];
  for (let i = 0; i < latestBlogs.length; i += 1) {
    chunkedPostsTwo.push(latestBlogs.slice(i, i + 1));
  }

  function convertToSlug(text) {
    // Check if text is defined or not
    if (!text) {
      return "";
    }

    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  }

  return (
    <div>
      <div className="blog_slider_sec blog_slider_sec__desktop">
        <div className="container">
          <div className="blog__search__box">
            <h2 className="blog_head_txt">{props?.title}</h2>
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
                        alt={post.title.rendered}
                        className={`blog__slider__img ${
                          innerIndex % 3 === 0
                            ? "first__image__blog__slider"
                            : ""
                        }`}
                      />
                    ) : (
                      <Image
                        width={300}
                        height={300}
                        src="/ak-blog.png"
                        alt="Default Image"
                        className={`blog__slider__img ${
                          innerIndex % 3 === 0
                            ? "first__image__blog__slider"
                            : ""
                        }`}
                      />
                    )}
                    <p className="date__txt" style={{ paddingTop: "5px" }}>
                      <Link
                        href={`/blog/author/${convertToSlug(
                          authors[post.author] || ""
                        )}`}
                        target="_blank"
                        className=""
                      >
                        {authors[post.author]}
                      </Link>{" "}
                      |{" "}
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      {innerIndex === 0 ? "| 0 Comments" : ""}
                    </p>
                    <h3
                      className="blog__title"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div
                      className="blog__content"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <h6 className="read__more__btn btn__anim">Read more</h6>
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
            <h2 className="blog_head_txt">{props?.title}</h2>
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
                    {post?.acf?.featured_image ? (
                      <Image
                        width={300}
                        height={300}
                        src={post?.acf?.featured_image}
                        alt={post.title.rendered}
                        className="blog__slider__img"
                      />
                    ) : (
                      <Image
                        width={300}
                        height={300}
                        src="/ak-blog.png"
                        alt="Default Image"
                        className="blog__slider__img"
                      />
                    )}
                    <p className="date__txt" style={{ paddingTop: "10px" }}>
                      <Link
                        href={`/blog/author/${convertToSlug(
                          authors[post.author] || ""
                        )}`}
                        target="_blank"
                        className=""
                      >
                        {authors[post.author]}
                      </Link>{" "}
                      |{" "}
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      {innerIndex === 0 ? "| 0 Comments" : ""}
                    </p>
                    <h3
                      className="blog__title"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <Link href={`/blog/${post.slug}`} target="_blank">
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
export default BlogPageSlider;
