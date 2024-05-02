import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const Blog = ({ props }) => {
  const blogSectionRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://akstaging.thor.work/wp-json/wp/v2/posts?categories=218&per_page=100"
        );
        if (response.ok) {
          const data = await response.json();
          setAllPosts(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  const isLastPage = currentPage === totalPages;
  const hasNextPage = indexOfLastPost < allPosts.length;

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    } else if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <div
      className="container second__blog__section news__events__section"
      ref={blogSectionRef}
    >
      <svg
        width="800"
        height="100%"
        viewBox="0 0 618 730"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="homesvg"
        className="blog__svg"
      >
        <path
          d="M-113 447.954L202.227 132.727V730"
          stroke="#F47920"
          strokeOpacity="1"
          strokeWidth="1.43466"
          className="svg-elem-1"
        ></path>
        <path
          d="M301.773 0V580.682L459.386 423.068M617 265.455L459.386 423.068M459.386 423.068L583.818 547.5"
          stroke="#F47920"
          strokeOpacity="1"
          strokeWidth="1.43466"
          className="svg-elem-2"
        ></path>
      </svg>
      <h2 className="blog_head_txt">{props?.news_title}</h2>
      {currentPosts.map((post) => (
        <div key={post.id} className="blog__main__box">
          <div className="blog__sub__box">
            {post?.acf?.featured_image ? (
              <Image
                width={300}
                height={300}
                src={post.acf.featured_image}
                alt={post.post_title}
                className="event__blog__img"
              />
            ) : (
              <Image
                width={300}
                height={300}
                src="/ak-blog.png"
                alt="Default Image"
              />
            )}
            <div className="content__box__blog news__events__blog__box">
              <p className="date__txt ">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
              </p>
              <h3 className="title__txt event__title__txt">
                {post?.title?.rendered}
              </h3>
              <div
                dangerouslySetInnerHTML={{ __html: post?.excerpt?.rendered }}
                className="des__txt news__events__txt"
              />
              <Link href={`/posts/${post.slug}`} target="_blank">
                <h6 className="read__more btn__anim">Read more</h6>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <ul className="pagination">
        {currentPage > 1 && (
          <li onClick={() => setCurrentPage(currentPage - 1)}>
            <a>&laquo; Previous</a>
          </li>
        )}

        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <li
            key={number}
            className={`${currentPage === number ? "active" : ""}`}
            onClick={() => setCurrentPage(number)}
          >
            <a>{number}</a>
          </li>
        ))}

        {currentPage < totalPages && (
          <li onClick={() => setCurrentPage(currentPage + 1)}>
            <a>Next &raquo;</a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Blog;
