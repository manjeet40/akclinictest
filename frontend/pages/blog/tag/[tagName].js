import React, { useEffect } from "react";

import axios from "axios";

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import TagBanner from "@/components/tagPage/banner";
import TagContent from "@/components/tagPage/tagContent";
import Newsletter from "@/components/tagPage/newsletter";

const isServer = typeof window === "undefined";
const WOW = !isServer ? require("wow.js/dist/wow.js") : null;

export default function Tag({ commonData, tagPosts }) {
  // Header,
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

  return (
    <div id="main__tag__page">
      <Header commonData={commonData} />
      <TagBanner tagPosts={tagPosts} />
      <TagContent tagPosts={tagPosts} />
      <Newsletter />
      <Footer commonData={commonData} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  let commonData = {};
  let tagPosts = [];
  let error = null;

  try {
    // Fetch options data
    const resOptions = await axios(
      `https://admin.akclinics.com/wp-json/acf/v2/options/`
    );
    commonData = resOptions?.data?.acf || {};

    // Fetch tag data based on the tagName from the query
    if (query.tagName) {
      const tagResponse = await fetch(
        `https://admin.akclinics.com/wp-json/wp/v2/tags?slug=${query.tagName}`
      );

      if (!tagResponse.ok) {
        throw new Error("Failed to fetch tag data");
      }

      const [tagData] = await tagResponse.json();

      if (!tagData || !tagData.id) {
        throw new Error("Tag data not found");
      }

      const tagId = tagData.id;

      // Fetch posts for the tag
      const postsResponse = await fetch(
        `https://admin.akclinics.com/wp-json/wp/v2/posts?tags=${tagId}`
      );

      if (!postsResponse.ok) {
        throw new Error("Failed to fetch posts for this tag");
      }

      tagPosts = await postsResponse.json();
    }
  } catch (fetchError) {
    error = fetchError.message;
  }

  return {
    props: {
      commonData,
      tagPosts,
      error,
    },
  };
}
