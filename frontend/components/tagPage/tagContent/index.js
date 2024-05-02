import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Tag = ({ tagPosts }) => {
  const router = useRouter();
  const { tagName } = router.query;

  const [authors, setAuthors] = useState({});
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Fetch posts related to the tag
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          "https://akstaging.thor.work/wp-json/wp/v2/users"
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

  const formatTagName = (tagName) => {
    if (!tagName) return "";
    return tagName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formattedTagName = formatTagName(tagName);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tagPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(tagPosts.length / postsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Head>
        <title>{formattedTagName}</title>
      </Head>

      <div className="container second__blog__section">
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
        <div className="tag__page__sub">
          <h1 className="tag__name__heading">All Posts</h1>
          {error ? (
            <p>Error: {error}</p>
          ) : currentPosts.length > 0 ? (
            <div className="page__content__main blog__main__box">
              {currentPosts.map((post) => (
                <div
                  className="tag__page__content blog__sub__box"
                  key={post.id}
                >
                  <div className="tag__post__img__box">
                    {post?.acf?.featured_image ? (
                      <Image
                        src={post.acf.featured_image}
                        width={200}
                        height={200}
                        alt={post.title.rendered}
                        className="tag__post__img"
                      />
                    ) : (
                      <Image
                        src="/ak-blog.png"
                        alt="Default Image"
                        width={200}
                        height={200}
                        className="tag__post__img"
                      />
                    )}
                  </div>
                  <div className="content__box__blog">
                    <p className="date__txt">
                      {authors[post.author]} |{" "}
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      | 0 Comments
                    </p>
                    <h2
                      className="title__txt"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    ></h2>
                    <div
                      className="des__txt"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <h6 className="read__more btn__anim">Read more</h6>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No posts found for this tag.</p>
          )}

          {/* Pagination controls */}
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <li
                  key={number}
                  className={`${currentPage === number ? "active" : ""}`}
                  onClick={() => handlePageChange(number)}
                >
                  <a>{number}</a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Tag;
