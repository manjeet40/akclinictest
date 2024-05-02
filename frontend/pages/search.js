import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import ScrollToTopButton from "@/components/scrolltoTop";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const isServer = typeof window === "undefined";
const WOW = !isServer ? require("wow.js/dist/wow.js") : null;

const SearchPage = ({ posts, commonData }) => {
  const router = useRouter();
  const { query } = router.query;

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

  // Ensure that query is defined before using toLowerCase
  const filteredPosts = query
    ? posts.filter((post) =>
        post.title.rendered.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
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
                  Articles related to Search
                </h1>
                <h2 className="banner_training_sub_txt">
                  latest information and news.
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
                  {">"} <span className="color_bread_crums">Search</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container search__page__container">
        <h2 className="search__result__title">Search Results for: {query}</h2>
        {filteredPosts.map((post) => (
          <div key={post.id}>
            <Link href={`/blog/${post.slug}`} target="_blank">
              <h2
                className="search__title"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              ></h2>
              <div
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                className="search__para"
              />
            </Link>
          </div>
        ))}
      </div>

      <Footer commonData={commonData} />
    </>
  );
};

export default SearchPage;

export async function getStaticProps() {
  let commonData = {};
  // Fetch all blog posts from your WordPress API
  const response = await fetch(
    "https://admin.akclinics.com/wp-json/wp/v2/posts?per_page=600"
  );
  const resOptions = await axios(
    `https://admin.akclinics.com/wp-json/acf/v2/options/`
  );

  const posts = await response.json();
  commonData = resOptions?.data?.acf || {};

  return {
    props: { posts, commonData },
  };
}
