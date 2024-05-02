import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const Blogs = () => {
  const [blogData, setBlogData] = useState(null);
  const [authors, setAuthors] = useState({});
  const [activeAccordionId, setActiveAccordionId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveAccordionId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          "https://admin.akclinics.com/wp-json/wp/v2/pages/25474"
        );
        setBlogData(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          "https://admin.akclinics.com/wp-json/wp/v2/users"
        );
        if (response.ok) {
          const data = await response.json();
          const authorDetails = {};

          data.forEach((author) => {
            const authorName =
              author.name ||
              author.display_name ||
              author.login ||
              "Unknown Author";
            authorDetails[author.id] = authorName.trim();
          });

          setAuthors(authorDetails);
        } else {
          throw new Error("Failed to fetch authors");
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  // Define a static ID and item for the single accordion
  const id = 1;
  const idTwo = 2;
  const idThree = 3;

  return (
    <div className="important_links_box">
      <h2 className="import_head_txt">Top Posts</h2>

      {blogData?.acf?.sections?.map((section) => {
        if (
          section.acf_fc_layout === "single_blog" &&
          section.single_blog.blog
        ) {
          return (
            <div key={section.id}>
              {section.single_blog.blog.map((item) => (
                <div className="blog_content_box" key={item.ID}>
                  {item?.acf?.featured_image ? (
                    <Image
                      width={200}
                      height={200}
                      src={item?.acf?.featured_image}
                      alt="Img"
                    />
                  ) : (
                    <Image
                      width={200}
                      height={200}
                      src="/ak-blog.png"
                      alt="Default Image"
                    />
                  )}
                  <div className="txt_content">
                    <p className="date__txt single__blog__date">
                      {authors[item.post_author] || "Unknown"} |{" "}
                      {new Date(item.post_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h2 className="blog_title">{item.post_title}</h2>
                    <Link href={`/blog/${item.post_name}`} target="_blank">
                      <h5 className="blog_btn btn__anim">Read More</h5>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}

      <div className="important__links__pages">
        <h2 className="import_head_txt">Important Links</h2>

        <div
          className={`faq blog__faq ${
            activeAccordionId === id ? "open" : "close"
          }`}
        >
          <div className="faq_q" onClick={() => toggleAccordion(id)}>
            <div className="ques_main l__faq__ques">
              <h5>Delhi</h5>
            </div>
            <span
              className={
                activeAccordionId === id ? "plus_icon minus_icon" : "plus_icon"
              }
            ></span>
          </div>
          <div
            className={`faq_a ${activeAccordionId === id ? "open" : "closed"}`}
          >
            <ul>
              <li>
                <Link href={`/delhi/hair-transplant`} target="_blank">
                  Hair Transplant in Delhi
                </Link>
              </li>
              <li>
                <Link href={`/delhi/hair-loss`} target="_blank">
                  Hair Loss Treatment in Delhi
                </Link>
              </li>
              <li>
                <Link href={`/delhi/prp-hair-loss-treatment`} target="_blank">
                  PRP Therapy in Delhi
                </Link>
              </li>
              <li>
                <Link href={`/delhi/laser-hair-removal`} target="_blank">
                  Laser Hair Removal in Delhi
                </Link>
              </li>
              <li>
                <Link href={`/delhi/acne-treatment`} target="_blank">
                  Acne Treatment in Delhi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`faq blog__faq ${
            activeAccordionId === idTwo ? "open" : "close"
          }`}
        >
          <div className="faq_q" onClick={() => toggleAccordion(idTwo)}>
            <div className="ques_main l__faq__ques">
              <h5>Ludhiana</h5>
            </div>
            <span
              className={
                activeAccordionId === idTwo
                  ? "plus_icon minus_icon"
                  : "plus_icon"
              }
            ></span>
          </div>
          <div
            className={`faq_a ${
              activeAccordionId === idTwo ? "open" : "closed"
            }`}
          >
            <ul>
              <li>
                <Link href={`/ludhiana/hair-transplant`} target="_blank">
                  Hair Transplant in Ludhiana
                </Link>
              </li>
              <li>
                <Link href={`/ludhiana/hair-loss-treatment`} target="_blank">
                  Hair Loss Treatment in Ludhiana
                </Link>
              </li>
              <li>
                <Link
                  href={`/ludhiana/prp-therapy-in-ludhiana`}
                  target="_blank"
                >
                  PRP Therapy in Ludhiana
                </Link>
              </li>
              <li>
                <Link
                  href={`/ludhiana/laser-hair-removal-in-ludhiana`}
                  target="_blank"
                >
                  Laser Hair Removal in Ludhiana
                </Link>
              </li>
              <li>
                <Link
                  href={`/ludhiana/acne-treatment-in-ludhiana`}
                  target="_blank"
                >
                  Acne Treatment in Ludhiana
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`faq blog__faq ${
            activeAccordionId === idThree ? "open" : "close"
          }`}
        >
          <div className="faq_q" onClick={() => toggleAccordion(idThree)}>
            <div className="ques_main l__faq__ques">
              <h5>Bangalore</h5>
            </div>
            <span
              className={
                activeAccordionId === idThree
                  ? "plus_icon minus_icon"
                  : "plus_icon"
              }
            ></span>
          </div>
          <div
            className={`faq_a ${
              activeAccordionId === idThree ? "open" : "closed"
            }`}
          >
            <ul>
              <li>
                <Link
                  href={`/bangalore/best-hair-transplant-clinic`}
                  target="_blank"
                >
                  Hair Transplant in Bangalore
                </Link>
              </li>
              <li>
                <Link href={`/bangalore/hair-loss-treatment`} target="_blank">
                  Hair Loss Treatment in Bangalore
                </Link>
              </li>
              <li>
                <Link
                  href={`/bangalore/prp-hair-loss-treatment`}
                  target="_blank"
                >
                  PRP Therapy in Bangalore
                </Link>
              </li>
              <li>
                <Link
                  href={`/bangalore/laser-hair-removal-for-men-and-women`}
                  target="_blank"
                >
                  Laser Hair Removal in Bangalore
                </Link>
              </li>
              <li>
                <Link
                  href={`/bangalore/laser-acne-scar-removal-treatment`}
                  target="_blank"
                >
                  Acne Treatment in Bangalore
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
