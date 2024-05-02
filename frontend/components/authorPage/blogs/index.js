import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const AuthorPosts = ({ authorPosts }) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const blogSectionRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);
  const [authors, setAuthors] = useState({});
  const router = useRouter();
  const authorName = router.query.name;

  // Function to convert slug to a more readable format
  const formatAuthorName = (slug) => {
    if (!slug) {
      return ""; // Return an empty string or handle the undefined case here
    }

    const parts = slug.split("-");
    const formattedParts = parts.map((part, index) => {
      // Handle 'dr' prefix
      if (index === 0 && part.toLowerCase() === "dr") {
        return "Dr.";
      }
      // Handle 'ak' prefix
      if (part.toLowerCase() === "ak") {
        return "AK";
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    });

    return formattedParts.join(" ");
  };

  // Transform the authorName slug
  const formattedAuthorName = formatAuthorName(authorName);

  let filteredPosts = [];

  if (formattedAuthorName) {
    // Find the authorId based on the formattedAuthorName
    const authorId = Object.keys(authors).find(
      (key) => authors[key] === formattedAuthorName
    );

    // Filter posts based on the author's ID
    filteredPosts = authorPosts.filter(
      (post) => post.author === parseInt(authorId)
    );
  }

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

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    } else if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const isLastPage = currentPage === totalPages;
  const hasNextPage = indexOfLastPost < filteredPosts.length;

  const compactPaginationRange = 2; // Number of adjacent pages to show on each side

  const compactPageNumbers = () => {
    const startPage = Math.max(1, currentPage - compactPaginationRange);
    const endPage = Math.min(totalPages, currentPage + compactPaginationRange);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container author__blog__section" ref={blogSectionRef}>
      <h2 className="blog_head_txt">Posts by Author</h2>
      <div className="row">
        {currentPosts.map((post) => (
          <div key={post.id} className="col-lg-4 col-md-6 col-sm-12">
            <div className="author__blog__box">
              {post?.acf?.featured_image ? (
                <Image
                  width={300}
                  height={300}
                  src={post?.acf?.featured_image}
                  alt={post?.post_title}
                />
              ) : (
                <Image
                  width={300}
                  height={300}
                  src="/ak-blog.png"
                  alt="Default Image"
                />
              )}
              <div className="content__box__blog post__author__date">
                <p className="date__txt">
                  {authors[post.author]} |{" "}
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                  })}
                  , {new Date(post.date).getDate()}{" "}
                  {new Date(post.date).getFullYear()} | 0 Comments
                </p>
                <h3
                  className="title__txt"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></h3>
                <p
                  className="des__txt"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                ></p>
                <Link href={`/blog/${post.slug}`} target="_blank">
                  <h6 className="read__more btn__anim">Read more</h6>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ul className="pagination">
        {currentPage > 1 && (
          <li onClick={() => setCurrentPage(currentPage - 1)}>
            <a>Previous</a>
          </li>
        )}
        {compactPageNumbers().map((number) => (
          <li
            key={number}
            className={`${currentPage === number ? "active" : ""}`}
            onClick={() => paginate(number)}
          >
            <a>{number}</a>
          </li>
        ))}
        {currentPage < totalPages && (
          <li onClick={() => setCurrentPage(currentPage + 1)}>
            <a>Next</a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AuthorPosts;
