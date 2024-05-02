import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const SingleBlog = ({ props }) => {
  const [blogData, setBlogData] = useState(null);

  // useEffect(() => {
  //   const fetchBlogData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://akstaging.thor.work/wp-json/wp/v2/pages?per_page=100"
  //       );
  //       setBlogData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching blog data:", error);
  //     }
  //   };

  //   fetchBlogData();
  // }, []);

  return (
    <div className="important_links_box">
      <h2 className="import_head_txt">Top Posts</h2>
      {props &&
        props?.blog.map((item) => {
          return (
            <div className="blog_content_box" key={item.id}>
              <Image
                width={300}
                height={300}
                src={item?.acf?.featured_image}
                alt="Img"
              />
              <div className="txt_content">
                <h6 className="blog_cmnt">{item.acf.comment}</h6>
                <h1 className="blog_title">{item?.post_title}</h1>
                <Link href={`/posts/${item.post_name}`} target="_blank">
                  <h5 className="blog_btn btn__anim">Read More</h5>
                </Link>
              </div>
            </div>
          );
        })}

      <div className="important__links__pages">
        <h2 className="import_head_txt">Important Links</h2>
        <ul>
          <li>
            <Link href={`/hair-transplantation-delhi`} target="_blank">
              Hair Transplant in Delhi
            </Link>
          </li>
          <li>
            <Link href={`/hair-transplantation-ludhiana`} target="_blank">
              Hair Transplant in Ludhiana
            </Link>
          </li>
          <li>
            <Link href={`/hair-transplantation-bengaluru`} target="_blank">
              Hair Transplant in Bengaluru
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleBlog;
