import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { request, gql } from "graphql-request";

import { DiscussionEmbed } from "disqus-react";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Banner from "@/components/blogSingle/banner";
import Blogs from "@/components/blogSingle/blogs";

import CallbackPopup from "@/components/blogSingle/popup";

import ScrollToTopButton from "@/components/scrolltoTop";

import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "next-share";

const isServer = typeof window === "undefined";
const WOW = !isServer ? require("wow.js/dist/wow.js") : null;

gsap.registerPlugin(ScrollTrigger);

const Post = ({ post, commonData, matchedAuthorContentData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to the search page with the search query
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  const disqusShortname = "ak-clinics";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const disqusConfig = {
    url: pageUrl,
    identifier: post?.slug,
    title: post?.title?.rendered,
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    // Add logic to handle body overflow here
    document.body.style.overflow = showPopup ? "auto" : "hidden";
  };

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
            "transparent";
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

  // ScrollTrigger Pin Element using GSAP
  useEffect(() => {
    let ctx = gsap.context(() => {
      let brandImageBlock = document.getElementById("main");
      let brandImagePin = document.getElementById("right_section");
      let brandImageNotPin = document.getElementById("left_section");

      const pinTrigger = ScrollTrigger.create({
        trigger: brandImagePin,
        start: "top 10%", // Adjusted the top position
        endTrigger: brandImageNotPin,
        end: "bottom 45%", // Adjusted the end position
        invalidateOnRefresh: true,
        pin: brandImagePin,
        pinSpacing: false, // Added to prevent spacing issues
        markers: false,
      });

      // Additional logic to refresh the ScrollTrigger timeline when the post changes
      router.events.on("routeChangeComplete", () => {
        pinTrigger.scroll(isServer ? {} : window, true);
      });
    });

    return () => ctx.revert();
  }, []);

  // Refresh the ScrollTrigger
  useEffect(() => {
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    // Call refreshScrollTrigger after 2 seconds
    const timeoutId = setTimeout(refreshScrollTrigger, 2500);

    // Clear the timeout if the component unmounts before 2 seconds
    return () => clearTimeout(timeoutId);
  }, []);

  // Accordions
  useEffect(() => {
    function toggleAccordion(event) {
      event.preventDefault();
      const collapseId = this.getAttribute("href").replace("#", "");
      const collapseElement = document.getElementById(collapseId);

      const allAccordionElements = document.querySelectorAll(".panel-collapse");
      allAccordionElements.forEach((element) => {
        if (element !== collapseElement && element.classList.contains("open")) {
          element.classList.remove("open");
          element.style.height = "0";
        }
      });

      if (collapseElement.classList.contains("open")) {
        collapseElement.classList.remove("open");
        collapseElement.style.height = "0";
      } else {
        collapseElement.classList.add("open");
        collapseElement.style.height = `${collapseElement.scrollHeight}px`;
      }
    }

    const accordionHeadings = document.querySelectorAll(".accordion-toggle");

    accordionHeadings.forEach((heading) => {
      heading.addEventListener("click", toggleAccordion);
    });

    return () => {
      // Clean up event listeners when the component unmounts
      accordionHeadings.forEach((heading) => {
        heading.removeEventListener("click", toggleAccordion);
      });
    };
  }, []);

  useEffect(() => {
    if (refreshTrigger) {
      ScrollTrigger.refresh(); // Refresh ScrollTrigger
      setRefreshTrigger(false); // Reset the state to prevent continuous refresh
    }
  }, [refreshTrigger]);

  if (router.isFallback) {
    return (
      <div className="loader__flex">
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  const { slug } = post;

  const goToNextPost = async () => {
    try {
      // Fetch the post slugs from the WordPress REST API
      const apiUrl = "https://admin.akclinics.com/wp-json/wp/v2/posts";
      const response = await fetch(apiUrl);
      const postsData = await response.json();

      // Find the index of the current post
      const currentIndex = postsData.findIndex((p) => p.slug === slug);

      // Navigate to the next post (circular)
      const nextIndex = (currentIndex + 1) % postsData.length;
      const nextPostSlug = postsData[nextIndex].slug;

      router.push(`/blog/${nextPostSlug}`);
      setRefreshTrigger(true);
    } catch (error) {
      console.error("Error fetching or navigating to next post:", error);
    }
  };

  const goToPreviousPost = async () => {
    try {
      // Fetch the post slugs from the WordPress REST API
      const apiUrl = "https://admin.akclinics.com/wp-json/wp/v2/posts";
      const response = await fetch(apiUrl);
      const postsData = await response.json();

      // Find the index of the current post
      const currentIndex = postsData.findIndex((p) => p.slug === slug);

      // Navigate to the previous post (circular)
      const previousIndex =
        (currentIndex - 1 + postsData.length) % postsData.length;
      const previousPostSlug = postsData[previousIndex].slug;

      router.push(`/blog/${previousPostSlug}`);
      setRefreshTrigger(true);
    } catch (error) {
      console.error("Error fetching or navigating to previous post:", error);
    }
  };

  function convertToSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  }

  const { graphQlData } = post;

  const seoData = graphQlData.find((item) => item.slug === post.slug)?.seo;

  return (
    <div className="main_blog_single">
      <Head>
        <title>{seoData?.title}</title>
        <meta name="description" content={seoData?.metaDesc} />
        <meta name="keywords" content={seoData?.focuskw} />
        <link rel="canonical" href={seoData?.canonical} />
      </Head>

      <ScrollToTopButton />

      {commonData && <Header commonData={commonData} />}

      <Banner post={post} />

      <div className="container blog-font">
        <div className="content_container" id="main">
          <div className="row">
            <div className="col-lg-8">
              <div className="left_content">
                <h1
                  className="heading_txt"
                  dangerouslySetInnerHTML={{ __html: post?.title?.rendered }}
                />

                <h4 className="blog__sub_heading_txt">
                  <Link
                    href={`/blog/author/${convertToSlug(post.author)}`}
                    target="_blank"
                    className="blog__author__name__color"
                  >
                    {post?.author}
                  </Link>{" "}
                  |{" "}
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                  })}
                  , {new Date(post.date).getDate()}{" "}
                  {new Date(post.date).getFullYear()} | 0 Comments
                </h4>
                <div
                  dangerouslySetInnerHTML={{ __html: post?.content?.rendered }}
                  className="para_txt_blog img__blog"
                ></div>

                <div className="ques_box">
                  <h1 className="ques_heading_txt">{post.acf?.title_two}</h1>
                  <h6 className="sub_ques_txt">{post.acf?.sub_title_two}</h6>

                  <div className="row">
                    {post?.acf?.medi_repeat &&
                      post?.acf?.medi_repeat.map((item, id) => {
                        return (
                          <div className="col-lg-4 col-md-4 col-sm-6" key={id}>
                            <h3 className="effect_txt">{item.medi_text}</h3>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="gsap__left__section" id="left_section"></div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="right_content">
                <div className="search__box__relative">
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Search"
                      className="input_search_blog_single"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Image
                      width={20}
                      height={20}
                      src="/blog/search.svg"
                      alt="Search_Image"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search__svg"
                    />
                  </form>
                </div>

                <div className="svg__blog">
                  <svg
                    width="618"
                    height="100%"
                    viewBox="0 0 618 730"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    id="homesvg"
                  >
                    <path
                      d="M-113 447.954L202.227 132.727V730"
                      stroke="#F47920"
                      strokeOpacity="1"
                      strokeWidth="2"
                      className="svg-elem-1"
                    ></path>
                    <path
                      d="M301.773 0V580.682L459.386 423.068M617 265.455L459.386 423.068M459.386 423.068L583.818 547.5"
                      stroke="#F47920"
                      strokeOpacity="1"
                      strokeWidth="2"
                      className="svg-elem-2"
                    ></path>
                  </svg>
                </div>

                <Blogs />

                <div
                  className="call_back_box gsap__right__section"
                  id="right_section"
                >
                  <h3 className="call_back_title">
                    Are you losing your hair & confidence?
                  </h3>
                  <h5 className="call_back_sub_title">
                    Please register yourself to get a Call Back.
                  </h5>
                  <button className="call_back_btn" onClick={togglePopup}>
                    REQUEST A CALL
                  </button>
                </div>
              </div>
            </div>
            {showPopup && <CallbackPopup handleClose={togglePopup} />}

            <div className="row flex_end">
              <div className="author_posts_box">
                {matchedAuthorContentData?.acf?.authors?.image ? (
                  <Image
                    src={matchedAuthorContentData?.acf?.authors?.image}
                    alt={post.author}
                    width={200}
                    height={200}
                  />
                ) : null}
                <div className="author_post_content">
                  <h3 className="author_heading_txt">{post.author}</h3>
                  <p
                    className="author_para_txt"
                    dangerouslySetInnerHTML={{
                      __html:
                        matchedAuthorContentData?.acf?.authors?.description,
                    }}
                  ></p>
                  <h3 className="author_main_heading btn__anim">
                    <Link
                      href={`/blog/author/${convertToSlug(post.author)}`}
                      target="_blank"
                    >
                      Author Posts
                    </Link>
                  </h3>
                </div>
              </div>

              <div className="col-lg-4 flex__end__col">
                <div className="tags_box_blog">
                  <div className="tags">
                    {post.tags &&
                      post.tags.map((tag, index) => (
                        <Link
                          href={`/blog/tag/${encodeURIComponent(
                            convertToSlug(tag)
                          )}`}
                          key={index}
                          target="_blank"
                        >
                          <h6 className="tags_txt">{tag}</h6>
                        </Link>
                      ))}
                  </div>

                  <div className="share_box">
                    <h5 className="share_title">Share</h5>

                    <WhatsappShareButton
                      url={`https://www.akclinics.com/blog/${post.slug}`}
                      title={"WhatsApp"}
                      separator=":: "
                    >
                      <Image
                        width={30}
                        height={30}
                        src="/blog-single/whatsapp.svg"
                        alt="Whatsapp"
                      />
                    </WhatsappShareButton>
                    <EmailShareButton
                      url={`https://www.akclinics.com/blog/${post.slug}`}
                      subject={"Email"}
                      body="body"
                    >
                      <Image
                        width={30}
                        height={30}
                        src="/blog-single/email.svg"
                        alt="Email"
                      />
                    </EmailShareButton>
                    <FacebookShareButton
                      url={`https://www.akclinics.com/blog/${post.slug}`}
                      quote={"Facebook"}
                      hashtag={"#facebook"}
                    >
                      <Image
                        width={30}
                        height={30}
                        src="/blog-single/facebook.svg"
                        alt="Facebook"
                      />
                    </FacebookShareButton>
                  </div>
                </div>
              </div>
            </div>

            {post?.acf?.tip_box?.img_icon &&
              post?.acf?.tip_box?.title &&
              post?.acf?.tip_box?.desc && (
                <div className="col-lg-8">
                  <div className="tip_box">
                    <div className="tip_flex">
                      <Image
                        width={30}
                        height={30}
                        src={post?.acf?.tip_box?.img_icon}
                        alt="Tip"
                      />
                      <h3 className="quick_tip green_tip">
                        {post?.acf?.tip_box?.title}
                      </h3>
                    </div>
                    <p className="quick_tip_para">{post?.acf?.tip_box?.desc}</p>
                  </div>
                </div>
              )}

            <div className="prev_next_box">
              <h5 className="nxt btn__anim" onClick={goToPreviousPost}>
                Previous Post
              </h5>
              <h5 className="nxt btn__anim" onClick={goToNextPost}>
                Next Post
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginBottom: "50px" }}>
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>

      {commonData && <Footer commonData={commonData} />}
    </div>
  );
};

export default Post;

export async function getStaticProps({ params }) {
  const { slug } = params;
  let data = {
    pageData: null,
  };

  try {
    // Fetch post data using the WordPress REST API
    const postUrl = `https://admin.akclinics.com/wp-json/wp/v2/posts?slug=${slug}`;
    const postResponse = await fetch(postUrl);
    const [postData] = await postResponse.json();

    // Fetch common data using the WordPress REST API
    const commonDataUrl = "https://admin.akclinics.com/wp-json/acf/v2/options/";
    const commonDataResponse = await fetch(commonDataUrl);
    const commonData = await commonDataResponse.json();

    // Fetch tags data for the specific post
    const tagsUrl = `https://admin.akclinics.com/wp-json/wp/v2/tags?post=${postData.id}`;
    const tagsResponse = await fetch(tagsUrl);
    const tagsData = await tagsResponse.json();

    // Fetch author data for the specific post
    const authorUrl = `https://admin.akclinics.com/wp-json/wp/v2/users/${postData.author}`;
    const authorResponse = await fetch(authorUrl);
    const authorData = await authorResponse.json();

    // Extract the author's name from the fetched author email
    const authorEmail = authorData.name || "";
    const emailParts = authorEmail.split("@");
    const authorName = emailParts.length > 0 ? emailParts[0] : "";

    // Fetch GraphQL data
    const endpoint = "https://admin.akclinics.com/graphql";
    const postsPerPage = 600; // Adjust this based on your needs
    let hasNextPage = true;
    let endCursor = null;
    let allPosts = [];

    while (hasNextPage) {
      const GET_ALL_POSTS_SEO = gql`
        query GetAllPostsSEO($perPage: Int!, $cursor: String) {
          posts(first: $perPage, after: $cursor) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              seo {
                title
                metaDesc
                metaKeywords
                focuskw
                canonical
              }
              slug
              postId
            }
          }
        }
      `;

      const allPostsSEO = await request(endpoint, GET_ALL_POSTS_SEO, {
        perPage: postsPerPage,
        cursor: endCursor,
      });

      const pageInfo = allPostsSEO.posts.pageInfo;
      const nodes = allPostsSEO.posts.nodes;

      allPosts = [...allPosts, ...nodes];

      if (pageInfo.hasNextPage) {
        endCursor = pageInfo.endCursor;
      } else {
        hasNextPage = false;
      }
    }
    data.graphQl = allPosts;

    // Fetch author data
    const resAuthor = await fetch(
      "https://admin.akclinics.com/wp-json/wp/v2/authors"
    );
    const authors = await resAuthor.json();

    // Find the author whose doctor_name matches the authorName
    const matchedAuthor = authors.find((author) => {
      return author && author.title.rendered === authorName.trim();
    });

    let matchedAuthorContentData = null;

    if (matchedAuthor) {
      // Fetch content related to the matched author
      const matchedAuthorContentUrl = `https://admin.akclinics.com/wp-json/wp/v2/authors/${matchedAuthor.id}`;
      const matchedAuthorContentResponse = await fetch(matchedAuthorContentUrl);
      matchedAuthorContentData = await matchedAuthorContentResponse.json();
    }

    return {
      props: {
        post: {
          ...postData,
          tags: tagsData.map((tag) => tag.name),
          author: authorName.trim(),
          graphQlData: data.graphQl,
        },
        commonData: commonData.acf,
        matchedAuthorContentData,
      },
      revalidate: 20,
    };
  } catch (error) {
    console.error("Error fetching post data:", error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION === "true") {
    return {
      paths: [],
      fallback: true,
    };
  }

  // Call an external API endpoint to get posts
  const apiUrl =
    "https://admin.akclinics.com/wp-json/wp/v2/posts?per_page=1200";
  const response = await fetch(apiUrl);
  const postsData = await response.json();

  // Generate an array of objects containing the `params` key with slug
  const paths = postsData.map((post) => ({
    params: { slug: post.slug },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: true };
}
