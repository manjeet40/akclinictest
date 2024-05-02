import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

const TagBanner = ({ tagPosts }) => {
  const router = useRouter();
  const { tagName } = router.query;
  const [error, setError] = useState(null);

  const formatTagName = (tagName) => {
    if (!tagName) return "";
    return tagName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formattedTagName = formatTagName(tagName);
  return (
    <div className="training_banner">
      <div className="absolute_img">
        <Image src={`/tag/bg.png`} alt="Bg-Img" width={1000} height={1000} />
        <div className="container">
          <div className="training_content cosme__content__banner">
            <div className="training_banner_content">
              <h1
                className="banner_training_head_txt tag__banner__heading"
                style={{ textTransform: "capitalize" }}
              >
                {formattedTagName}
              </h1>
              {error ? (
                <p>Error: {error}</p>
              ) : tagPosts.length > 0 ? (
                <div>
                  <div
                    className="banner_training_sub_txt tag__banner__overflow"
                    key={tagPosts[0].id}
                    dangerouslySetInnerHTML={{
                      __html: tagPosts[0].excerpt.rendered,
                    }}
                  />
                </div>
              ) : (
                <p>No posts found for this tag.</p>
              )}
            </div>
            <div className="bread_crums training_bread_crums">
              <p className="bread_crum_content">
                <Link href={`/`} target="_blank">
                  {" "}
                  Home
                </Link>{" "}
                {">"}{" "}
                <Link href={`/blogs`} target="_blank">
                  {" "}
                  Blog
                </Link>{" "}
                {">"}{" "}
                <span
                  className="color_bread_crums"
                  dangerouslySetInnerHTML={{ __html: formattedTagName }}
                ></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagBanner;
