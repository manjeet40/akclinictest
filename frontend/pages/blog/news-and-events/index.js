import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import NewsEventsPagination from "@/components/paginations/NewsEvents";

import axios from "axios";

import ScrollToTopButton from "@/components/scrolltoTop";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import NewsLetter from "@/components/tagPage/newsletter";

const isServer = typeof window === "undefined";
const WOW = !isServer ? require("wow.js/dist/wow.js") : null;

export default function NewsEventsIndex({
  posts,
  currentPage,
  totalPages,
  commonData,
}) {
  const router = useRouter();
  const [authors, setAuthors] = useState({});

  // Header
  useEffect(() => {
    new WOW().init();
    document.addEventListener(
      "scroll",
      function () {
        if (window.scrollY >= 48) {
          document.querySelector(".header_bottom").style.background =
            "rgba(255, 255, 255, .9)";
          document.querySelector(".header_bottom").style.position = "fixed";
          document.querySelector(".header_bottom").style.top = "0";
          document.querySelector(".header_bottom").style.width = "100%";
          var x = document.querySelectorAll(".link");
          var y = document.querySelector(".links.btn");
          (y.style.background = "#231f20"), (y.style.color = "#FFF");

          var spans = document.querySelectorAll(".nav-icon1 span");

          [...spans].forEach(function (span) {
            span.style.background = "#212529";
          });

          for (var i = 0; i < x.length; i++) {
            x[i].style.color = "#231F20";
          }
          document.querySelector(".header_bottom").style.backdropFilter =
            "blur(7px)";
        } else {
          document.querySelector(".header_bottom").style.background =
            "linear-gradient(rgb(85 85 85) -38.46%, rgba(0, 0, 0, 0) 100%)";

          document.querySelector(".header_bottom").style.position = "relative";
          document.querySelector(".header_bottom").style.top = "auto";
          document.querySelector(".header_bottom").style.width = "100%";
          document.querySelector(".header_bottom").style.backdropFilter =
            "none";
          var x = document.querySelectorAll(".link");
          var y = document.querySelector(".links.btn");
          (y.style.background = "#FFF8EE"), (y.style.color = "#231f20");

          for (var i = 0; i < x.length; i++) {
            x[i].style.color = "#fff";
          }

          var spans = document.querySelectorAll(".nav-icon1 span");

          [...spans].forEach(function (span) {
            span.style.background = "#FFF8EE";
          });
        }
      },
      {
        passive: true,
      }
    );
  }, []);

  // Authors
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

  if (router.isFallback) {
    return <div></div>;
  }

  const pageTitle = `Latest Event, News and In-Press - AK Clinics${
    currentPage > 1 ? `-${currentPage}` : ""
  }`;

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
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Check out the all news and Events held at AK Clinics or Participate by Doctors of AK Clinics."
        />
        <link
          rel="canonical"
          href="https://akclinic-new.vercel.app/blog/news-and-events/"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      </Head>

      <ScrollToTopButton />

      <Header commonData={commonData} />

      <div className="training_banner">
        <div className="absolute_img">
          <Image
            width={1000}
            height={1000}
            src={`/category/bg.png`}
            alt="Bg-Img"
          />
          <div className="container">
            <div className="training_content blog__category__success__stories">
              <div className="training_banner_content">
                <h1
                  className="banner_training_head_txt"
                  style={{ textTransform: "capitalize" }}
                >
                  Articles related to News and Events
                </h1>
                <h2 className="banner_training_sub_txt">
                  latest information and news about News and Events.
                </h2>
              </div>
              <div className="bread_crums training_bread_crums">
                <p className="bread_crum_content">
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
                  <span className="color_bread_crums">News and Events</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container second__blog__section">
        <h2 className="blog_head_txt">All Posts</h2>
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

        {posts &&
          posts.map((post) => {
            return (
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
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <h6 className="read__more btn__anim">Read more</h6>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

        <NewsEventsPagination totalPages={totalPages} currentPage={1} />
      </div>

      <NewsLetter />

      <Footer commonData={commonData} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let commonData = {};
  const currentPage =
    params && params.index ? parseInt(params.index, 10) || 1 : 1;
  const postsPerPage = 6;
  const startIndex = (currentPage - 1) * postsPerPage;
  const apiUrl = `https://admin.akclinics.com/wp-json/wp/v2/posts?per_page=600&categories=218`;

  try {
    const resOptions = await axios(
      `https://admin.akclinics.com/wp-json/acf/v2/options/`
    );
    commonData = resOptions?.data?.acf || {};
    const response = await axios.get(apiUrl);

    const allPosts = response.data;
    const posts = allPosts.slice(startIndex, startIndex + postsPerPage);

    return {
      props: {
        posts,
        totalPages: Math.ceil(allPosts.length / postsPerPage),
        currentPage,
        commonData,
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error.message);

    return {
      props: {
        commonData,
        posts: [],
        totalPages: 0,
        currentPage: 0,
      },
      revalidate: 10,
    };
  }
}
