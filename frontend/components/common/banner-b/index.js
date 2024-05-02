import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Banner = ({ props, title, parentPage }) => {
  const [parentPageDetails, setParentPageDetails] = useState({
    name: "",
    link: "#",
  });

  useEffect(() => {
    const fetchParentPageDetails = async () => {
      try {
        const details = await fetchPageDetailsById(parentPage);
        // Remove "admin" from the link
        const linkWithoutAdmin = details.link
          ? details.link.replace("/admin.", "")
          : "";
        setParentPageDetails({
          name: details.title.rendered,
          link: linkWithoutAdmin ? `${linkWithoutAdmin}` : "#",
        });
      } catch (error) {
        console.error("Error fetching parent page details:", error);
        setParentPageDetails({
          name: "",
          link: "#",
        });
      }
    };

    fetchParentPageDetails();
  }, [parentPage]);

  const greaterThanSymbol = parentPage ? " > " : null;

  return (
    <div className="training_banner">
      <div className="absolute_img">
        <Image width={1000} height={1000} src={props?.image} alt="Bg-Img" />
        <div className="container">
          <div className="training_content cosme__content__banner">
            <div className="training_banner_content">
              <h1
                className="banner_training_head_txt"
                style={{ textTransform: "capitalize" }}
                dangerouslySetInnerHTML={{ __html: props?.title }}
              ></h1>
              <h2
                className="banner_training_sub_txt"
                dangerouslySetInnerHTML={{ __html: props?.sub_title }}
              ></h2>
            </div>
            <div className="bread_crums training_bread_crums">
              <p className="bread_crum_content">
                <Link href={`/`} target="_blank">
                  {" "}
                  Home
                </Link>{" "}
                {">"}{" "}
                {parentPageDetails.link ? (
                  <>
                    <Link href={parentPageDetails.link} target="_blank">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: parentPageDetails.name,
                        }}
                      ></span>
                    </Link>
                  </>
                ) : null}
                {greaterThanSymbol}
                <span
                  className="color_bread_crums"
                  dangerouslySetInnerHTML={{ __html: title }}
                ></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchPageDetailsById = async (pageId) => {
  try {
    const response = await fetch(
      `https://admin.akclinics.com/wp-json/wp/v2/pages/${pageId}`
    );
    const pageDetails = await response.json();
    return pageDetails;
  } catch (error) {
    console.error("Error fetching page details:", error);
    throw error;
  }
};

export default Banner;
