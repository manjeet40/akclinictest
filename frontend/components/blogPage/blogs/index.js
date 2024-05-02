import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const Blog = ({ props, blogs }) => {
  const router = useRouter();
  const blogSectionRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [authors, setAuthors] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://admin.akclinics.com/wp-json/wp/v2/categories?per_page=20"
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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

  const handleCategoryChange = (categoryId) => {
    const selectedCategory = categories.find((cat) => cat.id === categoryId);
    const categorySlug = selectedCategory ? selectedCategory.slug : "";

    // Construct the new URL without the '?' mark
    const newUrl = categorySlug ? `/blog/${categorySlug}` : "/blog";

    // Update URL with the new constructed URL
    router.push(newUrl, undefined, { scroll: false });

    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset currentPage to 1 when a new category is selected
  };

  // Handle URL reset on page refresh
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!url.includes("category")) {
        // Reset the URL to the base URL when there's no category query parameter
        router.push("/blog");
      }
    };

    // Check if the window object is defined (to prevent SSR errors)
    if (typeof window !== "undefined") {
      window.addEventListener("popstate", (e) => {
        handleRouteChange(e.target.location.href);
      });
    }

    return () => {
      // Clean up event listener on unmounting
      window.removeEventListener("popstate", (e) => {
        handleRouteChange(e.target.location.href);
      });
    };
  }, []);

  const filteredPosts = selectedCategory
    ? blogs.filter((post) => post.categories.includes(Number(selectedCategory)))
    : blogs;

  const sortedFilteredPosts = filteredPosts.sort((a, b) => {
    const dateA = new Date(a.post_date);
    const dateB = new Date(b.post_date);
    return dateB - dateA;
  });

  const MAX_VISIBLE_PAGES = 5;

  const calculatePageRange = () => {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const currentPageIndex = currentPage - 1;

    let startPage = Math.max(
      1,
      currentPageIndex - Math.floor(MAX_VISIBLE_PAGES / 2)
    );
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, totalPages - MAX_VISIBLE_PAGES + 1);
    }

    return { startPage, endPage };
  };

  const paginatedPosts = sortedFilteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const { startPage, endPage } = calculatePageRange();

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    } else if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchedPosts(filteredPosts); // Set searched posts to filtered posts initially
    } else {
      const matchingPosts = blogs.filter((post) =>
        post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedPosts(matchingPosts); // Update searched posts based on search term
    }
    setCurrentPage(1); // Reset pagination when search term changes
  }, [searchTerm, blogs, filteredPosts]);

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
  };

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
    <div className="container second__blog__section" ref={blogSectionRef}>
      <div className="blog__categories__field__box">
        <div className="search__box__relative__posts">
          <div className="search__box__relative">
            <input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search"
              className="input__search__blog__posts"
            />
            <Image
              width={25}
              height={25}
              src="/blog/search.svg"
              alt="Search_Image"
              className="search__svg"
            />
          </div>

          {/* <div className="custom-dropdown">
            <div className="custom-dropdown-header">
              <span>
                {selectedCategory
                  ? categories.find((cat) => cat.id === selectedCategory)?.name
                  : "All Categories"}
              </span>
            </div>
            <div className="custom-dropdown-content">
              <div
                onClick={() => handleCategoryChange("")}
                className="dropdown-item"
              >
                All Categories
              </div>
              {categories
                .filter((category) => category.name !== "Uncategorized")
                .map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className="dropdown-item"
                  >
                    {category.name}
                  </div>
                ))}
            </div>
          </div> */}
        </div>

        <h2 className="blog_head_txt">{props?.all_post?.title}</h2>
      </div>

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

      {searchedPosts.length > 0 ? (
        searchedPosts
          .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
          .map((post) => (
            <div key={post.id} className="blog__main__box">
              <div className="blog__sub__box">
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

                <div className="content__box__blog">
                  <p className="date__txt">
                    <Link
                      href={`/blog/author/${convertToSlug(
                        authors[post.author] || ""
                      )}`}
                      target="_blank"
                      className="blog__author__link"
                    >
                      {authors[post.author]}
                    </Link>{" "}
                    |{" "}
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                    })}
                    , {new Date(post.date).getDate()}{" "}
                    {new Date(post.date).getFullYear()} | 0 Comments
                  </p>
                  <div
                    className="title__txt"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div
                    className="des__txt"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <h6 className="read__more btn__anim">Read more</h6>
                  </Link>
                </div>
              </div>
            </div>
          ))
      ) : (
        <h2 className="title__txt">No matching posts found.</h2>
      )}

      {searchedPosts.length > postsPerPage && searchedPosts.length > 0 && (
        <ul className="pagination">
          {currentPage > 1 && (
            <li onClick={() => setCurrentPage(currentPage - 1)}>
              <a>&laquo; Previous</a>
            </li>
          )}

          {Array.from(
            { length: Math.ceil(searchedPosts.length / postsPerPage) },
            (_, i) => i + 1
          )
            .slice(
              currentPage - 1 > 2 ? currentPage - 3 : 0,
              currentPage + 2 <
                Math.ceil(searchedPosts.length / postsPerPage) - 1
                ? currentPage + 2
                : Math.ceil(searchedPosts.length / postsPerPage)
            )
            .map((number) => (
              <li
                key={number}
                className={`${currentPage === number ? "active" : ""}`}
                onClick={() => setCurrentPage(number)}
              >
                <a>{number}</a>
              </li>
            ))}

          {currentPage < Math.ceil(searchedPosts.length / postsPerPage) && (
            <li onClick={() => setCurrentPage(currentPage + 1)}>
              <a>Next &raquo;</a>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Blog;
