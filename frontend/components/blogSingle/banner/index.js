import Link from "next/link";
import Image from "next/image";

const Banner = ({ post }) => {
  return (
    <div className="blog_banner_single">
      <div className="absolute_img">
        {post?.acf?.banner_img ? (
          <Image
            src={post?.acf?.banner_img}
            alt={post?.title?.rendered}
            className="blog_single_img"
            width={1000}
            height={1000}
            priority
          />
        ) : (
          <Image
            src={`/blog-banner.webp`}
            width={1000}
            height={1000}
            className="blog_single_img"
            alt="Default Image"
            priority
          />
        )}
        <div className="container z__index">
          <h2
            className="banner__heading__blog__txt"
            dangerouslySetInnerHTML={{ __html: post?.title?.rendered }}
          ></h2>
          <h3 className="blog_bread_crums">
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
            <span
              className="color"
              dangerouslySetInnerHTML={{ __html: post?.title?.rendered }}
            ></span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;
