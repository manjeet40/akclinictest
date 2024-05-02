import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const CaseStudies = ({ props }) => {
  const blogSectionRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://akstaging.thor.work/wp-json/wp/v2/posts?categories=178&per_page=100"
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
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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

  console.log("API Data:", props.case_study);
  return (
    <div className="container" ref={blogSectionRef}>
      <div className="caseStudies__main">
        <h2 className="caseStudies__main__title">{props?.title}</h2>

        <div className="row casestudies__row">
          {currentPosts.map((item, id) => {
            return (
              <div className="col-lg-4 caseStudies__all" key={id}>
                {item?.acf?.featured_image ? (
                  <Image
                    width={300}
                    height={300}
                    src={item.acf.featured_image}
                    alt={item.post_title}
                    className="caseStuides__img"
                  />
                ) : (
                  <Image
                    width={300}
                    height={300}
                    src="/ak-blog.png"
                    alt="Default Image"
                    className="caseStuides__img"
                  />
                )}
                <p className="date__txt news__event__date">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                </p>
                <h2
                  className="title"
                  dangerouslySetInnerHTML={{ __html: item?.title?.rendered }}
                ></h2>
                <Link href={`/blog/${item.slug}`} target="_blank">
                  <h4 className="btn btn__anim">Read More</h4>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <ul className="pagination caseStuides__pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${currentPage === number ? "active" : ""}`}
            onClick={() => paginate(number)}
          >
            <a>{number}</a>
          </li>
        ))}
        <button
          className={`blog__btn__next btn__anim ${
            isLastPage || !hasNextPage ? "disabled" : ""
          }`}
          onClick={handleNextPage}
        >
          <span>Next</span>
        </button>
      </ul>
    </div>
  );
};

export default CaseStudies;
