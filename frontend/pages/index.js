import Head from "next/head";
import { useEffect } from "react";
import axios from "axios";
import { request, gql } from "graphql-request";

import ScrollToTopButton from "@/components/scrolltoTop";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Testimonial from "@/components/common/testimonial";
import Newsletter from "@/components/common/newsletter";
import Blogs from "@/components/common/blogs";
import BannerA from "@/components/common/banner-a";
import SuccessStories from "@/components/common/success-stories";
import Location from "@/components/common/location";
import Counter from "@/components/common/counter";
import ChooseAkclinics from "@/components/common/choose-akclinics";
import AboutAKclinics from "@/components/common/about-clinics";

/* Home Page */
import HomeContent from "@/components/home/homeContent";
import Services from "@/components/home/services";
import Results from "@/components/home/results";
import Teams from "@/components/home/team";

const Home = (props) => {
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

  return (
    <div>
      <Head>
        <title>500 Internal server error.</title>
        {props?.data?.graphQl?.page?.seo && (
          <>
            <title>{props.data.graphQl.page.seo.title}</title>
            <meta charset="UTF-8" />
            <meta
              name="description"
              content={props.data.graphQl.page.seo.metaDesc}
            />
            <meta
              name="keywords"
              content={props.data.graphQl.page.seo.focuskw}
            />
            <link
              rel="canonical"
              href={props.data.graphQl.page.seo.canonical}
            />
          </>
        )}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      </Head>

      {/* <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
          height: "100vh",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n                body { margin: 0; color: #000; background: #fff; }\n                .next-error-h1 {\n                  border-right: 1px solid rgba(0, 0, 0, .3);\n                }\n\n                @media (prefers-color-scheme: dark) {\n                  body { color: #fff; background: #000; }\n                  .next-error-h1 {\n                    border-right: 1px solid rgba(255, 255, 255, .3);\n                  }\n                }",
            }}
          />
          <h1
            className="next-error-h1"
            style={{
              display: "inline-block",
              margin: 0,
              marginRight: 20,
              padding: "0 23px 0 0",
              fontSize: 24,
              fontWeight: 500,
              verticalAlign: "top",
              lineHeight: 2,
            }}
          >
            500
          </h1>
          <div
            style={{
              display: "inline-block",
              textAlign: "left",
              lineHeight: 49,
              height: 49,
              verticalAlign: "middle",
            }}
          >
            <h2
              style={{
                fontSize: 14,
                fontWeight: "normal",
                lineHeight: 3,
                margin: 0,
                padding: 0,
              }}
            >
              Internal server error.
            </h2>
          </div>
        </div>
      </div> */}

      <ScrollToTopButton />

      {props?.data?.commonData && (
        <Header commonData={props?.data?.commonData} />
      )}

      {props?.data?.pageData.acf.sections.map((section, index) => {
        let layout = section.acf_fc_layout;

        switch (layout) {
          case "banner_a":
            return <BannerA props={section.banner_a} />;
          case "home_content":
            return <HomeContent props={section.home_content} />;
          case "our_services":
            return <Services props={section.our_services} />;
          case "about_akclinics":
            return <AboutAKclinics props={section.about_akclinics} />;
          case "choose_akclinics":
            return <ChooseAkclinics props={section.choose_akclinics} />;
          case "locations":
            return <Location props={section.our_infrastructure} />;
          case "counter":
            return <Counter props={section.counter} />;
          case "our_results":
            return <Results props={section.our_results} />;
          case "our_teams":
            return <Teams props={section.our_teams} />;
          case "blogs":
            return (
              props?.data?.blogs && (
                <Blogs props={section.blogs} blogs={props?.data?.blogs} />
              )
            );
          case "success_stories":
            return (
              props?.data?.stories_posts && (
                <SuccessStories
                  props={section.success_stories}
                  stories_posts={props?.data?.stories_posts}
                />
              )
            );
          case "news__events":
            return <NewsEvents props={section.news__events} />;

          case "testimonial":
            return <Testimonial props={section.testimonial} />;
          case "newsletter":
            return <Newsletter props={section.newsletter} />;

          default:
            return null;
        }
      })}

      {props?.data?.commonData && (
        <Footer commonData={props?.data?.commonData} />
      )}
    </div>
  );
};
export default Home;

export async function getStaticProps() {
  let data = {
    commonData: [],
    pageData: [],
    menuData: [],
    blogs: [],
    graphQl: [],
    error: false,
  };

  try {
    // Fetch page data
    const pageDataRes = await axios.get(
      "https://admin.akclinics.com/wp-json/wp/v2/pages/22289"
    );
    data.pageData = pageDataRes?.data;

    // Fetch common data
    const commonDataRes = await axios.get(
      "https://admin.akclinics.com/wp-json/acf/v2/options/"
    );
    data.commonData = commonDataRes?.data?.acf;

    // Fetch menu data
    const menuSlug = data.commonData?.header?.menu?.slug;
    const menuDataRes = await axios.get(
      `https://admin.akclinics.com/wp-json/menus/v1/menus/${menuSlug}`
    );
    data.menuData = menuDataRes?.data?.items;

    // Fetch blog posts
    const postsRes = await axios.get(
      "https://admin.akclinics.com/wp-json/wp/v2/posts?per_page=4"
    );
    data.blogs = postsRes?.data;

    // Fetch Success Stories Posts
    const storiesRes = await axios.get(
      "https://admin.akclinics.com/wp-json/wp/v2/stories?per_page=100"
    );

    data.stories_posts = storiesRes?.data;

    // Fetch additional data using GraphQL
    const endpoint = "https://admin.akclinics.com/graphql";

    // Define GraphQL query
    const GET_PAGE_SEO = gql`
      query GetPageSEO {
        page(id: "22289", idType: DATABASE_ID) {
          seo {
            metaDesc
            title
            metaKeywords
            focuskw
            canonical
          }
        }
      }
    `;

    // Make a GraphQL request using graphql-request
    const pageSEO = await request(endpoint, GET_PAGE_SEO);
    data.graphQl = pageSEO; // Assign GraphQL data to the graphQl key in the data object
  } catch (error) {
    console.error("Error fetching data:", error);
    data.error = true;
  }

  return {
    props: {
      data: data,
    },
    revalidate: 20,
  };
}
