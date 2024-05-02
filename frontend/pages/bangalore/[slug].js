import Head from "next/head";
import { useEffect } from "react";
import axios from "axios";

import { request, gql } from "graphql-request";

import dynamic from "next/dynamic";

const SuccessStories = dynamic(
  () => import("@/components/common/success-stories"),
  {
    ssr: true,
  }
);
const Blogs = dynamic(() => import("@/components/common/blogs"), { ssr: true });

import ScrollToTopButton from "@/components/scrolltoTop";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Testimonial from "@/components/common/testimonial";
import Newsletter from "@/components/common/newsletter";
import BannerA from "@/components/common/banner-a";
import BannerB from "@/components/common/banner-b";
import ExpertTeam from "@/components/common/expert-team";
import Location from "@/components/common/location";
import Counter from "@/components/common/counter";
import ChooseAkclinics from "@/components/common/choose-akclinics";
import Achievement from "@/components/common/achievement";
import FAQ from "@/components/common/faq";
import AboutAKclinics from "@/components/common/about-clinics";
import IndiasLeading from "@/components/common/indias-leading";
import CostTable from "@/components/common/cost-table";
import DocProfile from "@/components/common/dr-profile";

// Hair Transplant Page
import HairTransplantIndiasLeading from "@/components/hairTransplant/hair-transplant-indias-leading";
import HairTransplantFaq from "@/components/hairTransplant/hairTransplantFaq";
import AdvantagesHairTransplant from "@/components/hairTransplant/advantagesHairTransplant";
import HowWeDoIt from "@/components/hairTransplant/howWeDoIt";
import StepsSurgery from "@/components/hairTransplant/stepsSurgery";
import PostOperative from "@/components/hairTransplant/postOperative";
import TransplantCost from "@/components/hairTransplant/hairCostsTransplant";

//Laser Hair Removal Page
import HairRemovalContent from "@/components/laserHairRemoval/laserRemovalContent";
import HairRemovalWork from "@/components/laserHairRemoval/laserRemovalWork";
import AreasTreated from "@/components/laserHairRemoval/areasTreated";
import Advantage from "@/components/laserHairRemoval/advantages";
import Lasertype from "@/components/laserHairRemoval/laserUsedFaq";

/* Hair Loss Page */
import HairLossContent from "@/components/hairLossMen/hairLossContent";
import HairLossStages from "@/components/hairLossMen/stages";
import HairCause from "@/components/hairLossMen/hairLossCauses";
import HairLossMenWomen from "@/components/hairLossMen/hairlossMenWomen";
import HairLossFaqMenWomen from "@/components/hairLossMen/faqMenWomen";
import HairLossFaqTreatment from "@/components/hairLossMen/faqTreatment";

/* Training Page */
import TrainingContent from "@/components/trainingPage/observationContent/trainingContent";
import HairTraining from "@/components/trainingPage/hairTransplantTraining";
import ObservContent from "@/components/trainingPage/observationContent";
import Gallery from "@/components/trainingPage/gallery";

/* Team Page */
import TeamContent from "@/components/teamPage/teamContent";
import Doctors from "@/components/teamPage/doctors";
import News from "@/components/teamPage/news";
import DoctorsGallery from "@/components/teamPage/gallery";

/* Doctors Page */
import DoctorsAchievements from "@/components/doctorsPage/achievements";
import Dermatologist from "@/components/doctorsPage/dermatologist";
import Video from "@/components/doctorsPage/videoSection";
import Appointment from "@/components/doctorsPage/appointment";

/* Hair Restoration Page */
import Treatments from "@/components/hairRestoration/treatmentsAvailable";

/* Cosmetology Page */
import CosmetologyTreatments from "@/components/cosmetology/treatments";
import Technology from "@/components/cosmetology/technologyUsed";

/* Home Page */
import HomeContent from "@/components/home/homeContent";
import Services from "@/components/home/services";
import Results from "@/components/home/results";
import Teams from "@/components/home/team";

/* Location specific page */
import SkinTreatServices from "@/components/hairSkinLocation/skinTreatServices";
import LocationFaq from "@/components/hairSkinLocation/faq";

/* Transplant location Page */
import SkinServices from "@/components/hairTransplantLocation/skinTreatServices";
import FaqTransplant from "@/components/hairTransplantLocation/faq";
import HairExperts from "@/components/hairTransplantLocation/hairExperts";
import WhyAkCinic from "@/components/hairTransplantLocation/clinicLudhiana";
import TechniqueFaq from "@/components/hairTransplantLocation/techniqueFaq";
import Map from "@/components/hairSkinLocation/map";
import TreatAvailable from "@/components/hairTransplantLocation/treatAvailableLudhiana";

/* Result Page */
import BlogPage from "@/components/resultPage/results";

/* Contact us Page */
import ContactUs from "@/components/contactUS/form";

/* Case Study Page */
import CaseStudies from "@/components/caseStudyPage/caseStudies";

/* Blog Page */
import Blog from "@/components/blogPage/blogs";
import BlogPageSlider from "@/components/blogPage/slider";

/* Video Page */
import VideoData from "@/components/videoPage/videoSliders";

/* Author Page */
import AuthorBanner from "@/components/authorPage/banner";
import AuthorPosts from "@/components/authorPage/blogs";

/* News & Events Page */
import NewsEvents from "@/components/news&events/slider";
import NewsBlog from "@/components/news&events/blogs";

/* Blepharoplasty Page */
import BlepharoplastyTreatment from "@/components/blepharoplastyPage/treatments";

/* Single Blog Page */
import SingleBlog from "@/components/singleBlogPage/blogs";

const isServer = typeof window === "undefined";
const WOW = !isServer ? require("wow.js/dist/wow.js") : null;

const Home = (props) => {
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

  const currentPageSlug = props?.data?.pageData?.slug;
  const parentIdOfPage = "cG9zdDoyNTg0NA==";

  // Filter the data based on slug and parent ID match
  const currentPageData = props?.data?.graphQl.find((page) => {
    return page.slug === currentPageSlug && page.parentId === parentIdOfPage;
  });

  let currentPageSEOData;

  if (currentPageData) {
    currentPageSEOData = currentPageData.seo;
  }

  return (
    <div>
      <Head>
        {currentPageSEOData && (
          <>
            <title>{currentPageSEOData.title}</title>
            <meta name="description" content={currentPageSEOData.metaDesc} />
            <meta name="keywords" content={currentPageSEOData.focuskw} />
            <link rel="canonical" href={currentPageSEOData.canonical} />
          </>
        )}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      </Head>

      <ScrollToTopButton />

      {props?.data?.commonData && (
        <Header commonData={props?.data?.commonData} />
      )}

      {props?.data?.pageData.acf.sections.map((section, index) => {
        let layout = section.acf_fc_layout;

        switch (layout) {
          case "testimonial":
            return <Testimonial props={section.testimonial} />;
          case "newsletter":
            return <Newsletter props={section.newsletter} />;
          case "blogs":
            return (
              props?.data?.blogs && (
                <Blogs props={section.blogs} blogs={props?.data?.blogs} />
              )
            );
          case "banner_a":
            return <BannerA props={section.banner_a} />;
          case "banner_b":
            return (
              <BannerB
                props={section.banner_b}
                title={props?.data?.pageData.title.rendered}
                parentPage={props?.data?.pageData?.parent}
              />
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
          case "our_expert_team":
            return <ExpertTeam props={section.expert_team} />;
          case "locations":
            return <Location props={section.our_infrastructure} />;
          case "counter":
            return <Counter props={section.counter} />;
          case "choose_akclinics":
            return <ChooseAkclinics props={section.choose_akclinics} />;
          case "awards_recognisation":
            return <Achievement props={section.awards_recognisation} />;
          case "questions_asked":
            return <FAQ props={section.questions_asked} />;
          case "about_akclinics":
            return <AboutAKclinics props={section.about_akclinics} />;
          case "indias_leading":
            return <IndiasLeading props={section.indias_leading} />;
          case "hair_transplant_indias_leading":
            return (
              <HairTransplantIndiasLeading
                props={section.hair_transplant_indias_leading}
              />
            );
          case "types_of_hair_faq":
            return <HairTransplantFaq props={section.types_of_hair_faq} />;
          case "advantages_hair_transplant":
            return (
              <AdvantagesHairTransplant
                props={section.advantages_hair_transplant}
              />
            );
          case "how_we_do_it":
            return <HowWeDoIt props={section.how_we_do_it} />;
          case "steps_surgery":
            return <StepsSurgery props={section.steps_surgery} />;
          case "post_operatives":
            return <PostOperative props={section.post_operatives} />;
          case "hair_costs_transplant":
            return <TransplantCost props={section.hair_costs_transplant} />;
          case "laser_hair_removal_reduction":
            return (
              <HairRemovalContent
                props={section.laser_hair_removal_reduction}
              />
            );
          case "laser_hair_removal_procedure":
            return (
              <HairRemovalWork props={section.laser_hair_removal_procedure} />
            );
          case "areas_treated":
            return <AreasTreated props={section.areas_treated} />;
          case "advantage":
            return <Advantage props={section.advantage} />;
          case "laser_type":
            return <Lasertype props={section.laser_type} />;
          case "hair_loss_content":
            return <HairLossContent props={section.hair_loss_content} />;
          case "stages":
            return <HairLossStages props={section.stages} />;
          case "hair_cause":
            return <HairCause props={section.hair_cause} />;
          case "men_women":
            return <HairLossMenWomen props={section.men_women} />;
          case "faq_men_women":
            return <HairLossFaqMenWomen props={section.faq_men_women} />;
          case "faq_treatment":
            return <HairLossFaqTreatment props={section.faq_treatment} />;
          case "training_content":
            return <TrainingContent props={section.training_content} />;
          case "hair_training":
            return <HairTraining props={section.hair_training} />;
          case "observer_content":
            return (
              <ObservContent
                firstBox={section.first_box}
                secondBox={section.second_box}
                thirdBox={section.third_box}
              />
            );
          case "gallery":
            return <Gallery props={section.gallery} />;
          case "team_content":
            return <TeamContent props={section.team_content} />;
          case "doctors_team":
            return <Doctors props={section.doctors_team} />;
          case "news":
            return <News props={section.news} />;
          case "news":
            return <News props={section.news} />;
          case "doctors_gallery":
            return <DoctorsGallery props={section.doctors_gallery} />;
          case "achievements":
            return <DoctorsAchievements props={section.achievements} />;
          case "dermatologist_content":
            return <Dermatologist props={section.dermatologist_content} />;
          case "videos_section":
            return <Video props={section.videos_section} />;
          case "appointment_section":
            return <Appointment props={section.appointment_section} />;
          case "treatments":
            return <Treatments props={section.treatments} />;
          case "cosmetology_treatments":
            return (
              <CosmetologyTreatments props={section.cosmetology_treatments} />
            );
          case "tech_used":
            return <Technology props={section.tech_used} />;
          case "home_content":
            return <HomeContent props={section.home_content} />;
          case "our_services":
            return <Services props={section.our_services} />;
          case "our_results":
            return <Results props={section.our_results} />;
          case "our_teams":
            return <Teams props={section.our_teams} />;
          case "skin_treatments":
            return <SkinTreatServices props={section.skin_treatments} />;
          case "faq_locations":
            return <LocationFaq props={section.faq_locations} />;
          case "transplant_treatment":
            return <SkinServices props={section.transplant_treatment} />;
          case "faq_transplant":
            return <FaqTransplant props={section.faq_transplant} />;
          case "hair_experts":
            return <HairExperts props={section.hair_experts} />;
          case "why_akclincs":
            return <WhyAkCinic props={section.why_akclincs} />;
          case "technique_faq":
            return <TechniqueFaq props={section.technique_faq} />;
          case "map":
            return <Map props={section.map} />;
          case "treatment_available":
            return <TreatAvailable props={section.treatment_available} />;
          case "results_data":
            return <BlogPage props={section.results_data} />;
          case "contact_us":
            return <ContactUs props={section.contact_us} />;
          case "case_studies":
            return <CaseStudies props={section.case_studies} />;
          case "blog_listing":
            return <Blog props={section.blog_listing} />;
          case "slider_blogs":
            return <BlogPageSlider props={section.slider_blogs} />;
          case "videos_data":
            return <VideoData props={section.videos_data} />;
          case "author_banner":
            return <AuthorBanner props={section.author_banner} />;
          case "author_posts":
            return <AuthorPosts props={section.author_posts} />;
          case "news_events":
            return <NewsEvents props={section.news_events} />;
          case "news_blogs":
            return <NewsBlog props={section.news_blog} />;
          case "blepharoplasty_treatment":
            return (
              <BlepharoplastyTreatment
                props={section.blepharoplasty_treatment}
              />
            );
          case "single_blog":
            return <SingleBlog props={section.single_blog} />;
          case "cost_table":
            return <CostTable props={section.cost_table} />;
          case "dr_profile":
            return <DocProfile props={section.dr_profile} />;
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

export async function getStaticPaths({ params }) {
  const response = await fetch(
    "https://admin.akclinics.com/wp-json/wp/v2/pages?per_page=100"
  );
  const data = await response.json();
  // Get the paths we want to pre-render based on posts
  const paths = data.map((page) => ({
    params: { slug: page.slug },
  }));

  // We'll pre-render only these paths at build time.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  let data = {
    commonData: [],
    pageData: null,
    menuData: [],
    error: false,
  };

  try {
    const optionsResponse = await axios.get(
      "https://admin.akclinics.com/wp-json/acf/v2/options/"
    );
    data.commonData = optionsResponse?.data?.acf;

    const menuResponse = await axios.get(
      `https://admin.akclinics.com/wp-json/menus/v1/menus/${data.commonData?.header?.menu?.slug}`
    );
    data.menuData = menuResponse?.data?.items;

    // Fetch Success Stories Posts
    const storiesRes = await axios.get(
      "https://admin.akclinics.com/wp-json/wp/v2/stories?per_page=100"
    );
    data.stories_posts = storiesRes?.data;

    // Fetch blog posts
    const postsRes = await axios.get(
      "https://admin.akclinics.com/wp-json/wp/v2/posts?per_page=10"
    );
    data.blogs = postsRes?.data;

    // Fetch pages under the "Bangalore" parent page
    const cityParentPagesResponse = await axios.get(
      `https://admin.akclinics.com/wp-json/wp/v2/pages?parent=25844&per_page=20`
    );

    data.cityPages = cityParentPagesResponse.data;

    // Filter the page data for the requested slug from Bangalore pages
    const page = data.cityPages.find((page) => page.slug === params.slug);

    if (!page) {
      return {
        notFound: true,
      };
    }
    data.pageData = page;

    // Fetch GraphQL data
    const endpoint = "https://admin.akclinics.com/graphql";
    const pagesPerPage = 100; // Adjust this based on your needs
    let hasNextPage = true;
    let endCursor = null;
    let allPages = [];

    while (hasNextPage) {
      const GET_ALL_PAGES_SEO = gql`
        query GetAllPagesSEO($first: Int, $after: String) {
          pages(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              seo {
                metaDesc
                title
                metaKeywords
                focuskw
                canonical
              }
              slug
              parentId
            }
          }
        }
      `;

      const allPagesSEO = await request(endpoint, GET_ALL_PAGES_SEO, {
        first: pagesPerPage,
        after: endCursor,
      });

      const pageInfo = allPagesSEO.pages.pageInfo;
      const nodes = allPagesSEO.pages.nodes;

      allPages = [...allPages, ...nodes];

      if (pageInfo.hasNextPage) {
        endCursor = pageInfo.endCursor;
      } else {
        hasNextPage = false;
      }
    }

    data.graphQl = allPages;
  } catch (error) {
    data.error = true;
    console.log(error);
  }

  return {
    props: {
      data: data,
    },
    revalidate: 10,
  };
}
