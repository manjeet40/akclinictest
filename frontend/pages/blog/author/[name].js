import React, { useEffect } from "react";
import Head from "next/head";

import axios from "axios";

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import ScrollToTopButton from "@/components/scrolltoTop";

import Banner from "@/components/authorPage/banner";
import Blogs from "@/components/authorPage/blogs";

export default function ({ commonData, authorData, authorPosts }) {
  // Header
  useEffect(() => {
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

  return (
    <>
      <Head>
        <title>{authorData.authors.doctor_name}</title>
      </Head>
      <ScrollToTopButton />
      <Header commonData={commonData} />
      <Banner author={authorData} />
      <Blogs authorPosts={authorPosts} />
      <Footer commonData={commonData} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  let commonData = {};
  let authorData = {};
  let authorPosts = [];

  try {
    // Fetch common data
    const resOptions = await axios(
      `https://admin.akclinics.com/wp-json/acf/v2/options/`
    );
    commonData = resOptions?.data?.acf || {};

    // Fetch author data
    const resAuthor = await fetch(
      `https://admin.akclinics.com/wp-json/wp/v2/authors?slug=${params.name}`
    );
    const authors = await resAuthor.json();
    const author = authors[0]; // Assuming there is only one author with the given slug

    if (author && author.acf) {
      authorData = author.acf;
    }

    const resPosts = await fetch(
      `https://admin.akclinics.com/wp-json/wp/v2/posts?per_page=200&author_name=${params.name}`
    );

    if (resPosts.ok) {
      authorPosts = await resPosts.json();
    } else {
      console.error("Failed to fetch author posts");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return {
    props: {
      commonData,
      authorData,
      authorPosts,
    },
  };
}
