import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const settings = {
  dots: false,
  infinite: true,
  nextArrow: <SampleNextsArrow />,
  prevArrow: <SamplePrevsArrow />,
  slidesToShow: 1.99999,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        dots: false,
        arrows: false,
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

const Blogs = ({ props, blogs }) => {
  const [authors, setAuthors] = useState({});

  const fourBlogs = blogs.slice(0, 4);

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
            const nameParts = author.name.split("@");
            const firstName = nameParts.length > 1 ? nameParts[0] : author.name;
            authorDetails[author.id] = firstName.trim();
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
  return (
    <div className="blog_sec">
      <h2 className="blog_head">{props.heading}</h2>
      <div className="mob_container">
        <div className="for_mob">
          <Slider {...settings}>
            {fourBlogs &&
              fourBlogs.map((item, id) => {
                // Convert the date string to a Date object
                const postDate = new Date(item.date);

                // Format the date as 'Month DD, YYYY'
                const month = postDate.toLocaleDateString("en-US", {
                  month: "long",
                });
                const day = postDate.toLocaleDateString("en-US", {
                  day: "2-digit",
                });
                const year = postDate.toLocaleDateString("en-US", {
                  year: "numeric",
                });

                // Concatenate the formatted date with a comma after the month
                const finalFormattedDate = `${month}, ${day} ${year}`;

                // Check if the featured image exists, otherwise show a default image
                const imageSrc = item?.acf?.featured_image
                  ? item.acf.featured_image
                  : "/ak-blog.png"; // Replace '/default-image.jpg' with your default image path
                return (
                  <div className="blog_blk" key={id}>
                    <div className="blg_img">
                      <Image src={imageSrc} width={300} height={300} />
                    </div>
                    <p className="blog_p">
                      {authors[item.author]} | {finalFormattedDate}
                    </p>
                    <div
                      className="blog_title"
                      dangerouslySetInnerHTML={{
                        __html: item.title.rendered,
                      }}
                    />
                    <Link href={`/blog/${item.slug}`} target="_blank">
                      <button className="story_link btn__anim">
                        Read More
                      </button>
                    </Link>
                    <p className="blog_p">{item.post_excerpt}</p>
                  </div>
                );
              })}
          </Slider>
        </div>
        <div className="for_mob">
          <div className="view_blg_btn">
            <Link href={`/blog/`} target="_blank">
              <button>VIEW ALL</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container for_desk">
        <div className="row">
          {fourBlogs &&
            fourBlogs.map((item, id) => {
              // Convert the date string to a Date object
              const postDate = new Date(item.date);

              // Format the date as 'Month DD, YYYY'
              const month = postDate.toLocaleDateString("en-US", {
                month: "long",
              });
              const day = postDate.toLocaleDateString("en-US", {
                day: "2-digit",
              });
              const year = postDate.toLocaleDateString("en-US", {
                year: "numeric",
              });

              // Concatenate the formatted date with a comma after the month
              const finalFormattedDate = `${month}, ${day} ${year}`;

              // Check if the featured image exists, otherwise show a default image
              const imageSrc = item?.acf?.featured_image
                ? item.acf.featured_image
                : "/ak-blog.png"; // Replace '/default-image.jpg' with your default image path

              return (
                <div className="col-md-3" key={id}>
                  <div className="blog_blk">
                    <div className="blg_img">
                      <Image src={imageSrc} width={300} height={300} />
                    </div>
                    {/* Display the formatted date */}
                    <p className="blog_p">
                      {" "}
                      {authors[item.author]} | {finalFormattedDate}
                    </p>
                    <div
                      className="blog_title"
                      dangerouslySetInnerHTML={{
                        __html: item.title.rendered,
                      }}
                    />
                    <Link href={`/blog/${item.slug}`} target="_blank">
                      <button className="story_link btn__anim">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="view_blg_btn">
          <Link href={`/blog/`} target="_blank">
            <button className="btn__two">VIEW ALL</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Blogs;
