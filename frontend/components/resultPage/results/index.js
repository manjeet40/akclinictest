// pages/index.js

import { useState, useEffect, useRef } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import Pagination from "./Pagination";
import Slider from "react-slick";
import { gsap } from "gsap";
import Image from "next/image";

// Configure the slider settings
const carouselSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};

const itemsPerPage = 10; // Set the number of items to show per pagination

const BlogPage = ({ props }) => {
  const [resultsData, setResultsData] = useState([]);
  const sectionRef = useRef(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationsFilter, setLocationsFilter] = useState([]);
  const [techniquesFilter, setTechniquesFilter] = useState([]);
  const [ageFilter, setAgeFilter] = useState([]);
  const [durationFilter, setDurationFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);

  const fetchResultData = props || [];

  // State for managing the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Ref for the popup element
  const popupRef = useRef(null);

  // State to control the animation
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Function to open the popup and set the selected post
  const openPopup = (post) => {
    setIsPopupOpen(true);
    setSelectedPost(post);
    setShouldAnimate(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPost(null);
    setShouldAnimate(true);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleLocationsChange = (selectedLocations) => {
    setLocationsFilter(selectedLocations);
  };

  const handleTechniquesChange = (selectedTechniques) => {
    setTechniquesFilter(selectedTechniques);
  };

  const handleAgeChange = (selectedAges) => {
    setAgeFilter(selectedAges);
  };

  const handleDurationChange = (selectedDurations) => {
    setDurationFilter(selectedDurations);
  };

  const handlePriceChange = (selectedPrices) => {
    setPriceFilter(selectedPrices);
  };

  const uniqueLocations = [
    ...new Set(fetchResultData.map((post) => post.location)),
  ];
  const uniqueTechniques = [
    ...new Set(fetchResultData.map((post) => post.technique)),
  ];
  const uniqueAges = [...new Set(fetchResultData.map((post) => post.age))];
  const uniqueDurations = [
    ...new Set(fetchResultData.map((post) => post.duration)),
  ];
  const uniquePrices = [...new Set(fetchResultData.map((post) => post.price))];

  const filteredBlogData = fetchResultData.filter(
    (post) =>
      (!categoryFilter || post.category === categoryFilter) &&
      (!locationsFilter.length || locationsFilter.includes(post.location)) &&
      (!techniquesFilter.length || techniquesFilter.includes(post.technique)) &&
      (!ageFilter.length || ageFilter.includes(post.age)) &&
      (!durationFilter.length || durationFilter.includes(post.duration)) &&
      (!priceFilter.length || priceFilter.includes(post.price))
  );

  // Calculate the total number of pages based on the number of filtered items
  const totalPages = Math.ceil(filteredBlogData.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  // Add a useEffect hook to reset pagination to page 1 whenever the filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    categoryFilter,
    locationsFilter,
    techniquesFilter,
    ageFilter,
    durationFilter,
    priceFilter,
  ]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredBlogData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const isLastPage = currentPage === totalPages;
  const hasNextPage = indexOfLastPost < filteredBlogData.length;

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    } else if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  // Use useEffect to handle GSAP animations when the popup opens or closes
  useEffect(() => {
    if (shouldAnimate) {
      if (isPopupOpen) {
        // Play GSAP animation when the popup is opened
        gsap.to(popupRef.current, {
          opacity: 1,
          y: 0,
          display: "flex",
          duration: 0.5,
        });
      } else {
        // Play GSAP animation when the popup is closed
        gsap.to(popupRef.current, {
          opacity: 0,
          y: -1000,
          duration: 0,
          display: "none",
        });
      }

      // Reset the animation flag after the animation is complete
      setTimeout(() => setShouldAnimate(false), 300);
    }
  }, [shouldAnimate, isPopupOpen]);

  useEffect(() => {
    // Function to toggle body overflow
    const toggleBodyOverflow = () => {
      if (isPopupOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    toggleBodyOverflow();

    // Clean up by restoring the default overflow setting when unmounting or when showVideo changes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopupOpen]);

  return (
    <div className="results_main_section" ref={sectionRef}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="filters_box">
              <h3 className="filter_head">Filter by</h3>
              <div className="check_boxes">
                <label className="label">
                  <input
                    type="checkbox"
                    checked={categoryFilter === "Hair Transplant"}
                    onChange={() => setCategoryFilter("Hair Transplant")}
                    className="input"
                  />
                  Hair Transplant
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    checked={categoryFilter === "PRP THERAPY"}
                    onChange={() => setCategoryFilter("PRP THERAPY")}
                    className="input"
                  />
                  PRP THERAPY
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    checked={categoryFilter === "Cosmetic Surgery"}
                    onChange={() => setCategoryFilter("Cosmetic Surgery")}
                    className="input"
                  />
                  Cosmetic Surgery
                </label>
                <label className="label">
                  <input
                    type="checkbox"
                    checked={categoryFilter === ""}
                    onChange={() => setCategoryFilter("")}
                    className="input"
                  />
                  View All
                </label>
              </div>
            </div>
            <div className="filters__all">
              <div>
                <MultiSelectDropdown
                  options={uniqueTechniques}
                  onChange={handleTechniquesChange}
                  categoryName="Technique"
                />
              </div>
              <div>
                <MultiSelectDropdown
                  options={uniquePrices}
                  onChange={handlePriceChange}
                  categoryName="Grafts"
                />
              </div>
              <div>
                <MultiSelectDropdown
                  options={uniqueDurations}
                  onChange={handleDurationChange}
                  categoryName="Duration"
                />
              </div>
              <div>
                <MultiSelectDropdown
                  options={uniqueLocations}
                  onChange={handleLocationsChange}
                  categoryName="Location"
                />
              </div>

              <div>
                <MultiSelectDropdown
                  options={uniqueAges}
                  onChange={handleAgeChange}
                  categoryName="Age"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <ul className="results__ul">
              <div className="row">
                {currentPosts.map((post, id) => (
                  <div className="col-lg-6 col-sm-6 result__cont__box" key={id}>
                    <div className="result__img__box">
                      <Image
                        width={300}
                        height={300}
                        src={post.feature_img}
                        alt="Img"
                        onClick={() => openPopup(post)} // Open the popup with the selected blog posts
                      />
                    </div>
                    <div className="content__results">
                      <h2 className="title">{post.title}</h2>
                      <div className="location__box__results">
                        <span className="location__svg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M10.7123 10.1291L7 13.8414L3.28769 10.1291C1.23744 8.07878 1.23744 4.75469 3.28769 2.70444C5.33794 0.654185 8.66203 0.654185 10.7123 2.70444C12.7626 4.75469 12.7626 8.07878 10.7123 10.1291ZM7 7.58341C7.64435 7.58341 8.16667 7.0611 8.16667 6.41675C8.16667 5.77242 7.64435 5.25008 7 5.25008C6.35565 5.25008 5.83333 5.77242 5.83333 6.41675C5.83333 7.0611 6.35565 7.58341 7 7.58341Z"
                              fill="#F47920"
                            />
                          </svg>
                        </span>
                        <h3 className="location">{post.location}</h3>
                      </div>
                    </div>
                    <h2 className="sub__title">Age: {post.age || 0}</h2>
                    <h2 className="sub__title">
                      Technique: {post.technique} {post.price} Grafts
                    </h2>
                    <h2 className="sub__title">Duration: {post.duration}</h2>
                  </div>
                ))}
              </div>
            </ul>
          </div>

          <div className="results__pagination">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
            <button
              className={`blog__btn__next btn_result btn__anim ${
                isLastPage || currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={handleNextPage}
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="popup" ref={popupRef}>
        <div className="popup-content">
          <span className="close-popup" onClick={closePopup}>
            &times;
          </span>
          {/* ... (content for the popup) */}
          {selectedPost && (
            <div className="popup-cont">
              {/* Add your carousel here */}
              <Slider {...carouselSettings}>
                {selectedPost?.slider_img_one ? (
                  <div className="slider__result">
                    <Image
                      width={500}
                      height={500}
                      src={selectedPost.slider_img_one}
                      alt="Slider Img"
                    />
                  </div>
                ) : null}
                {selectedPost?.slider_img_two ? (
                  <div className="slider__result">
                    <Image
                      width={500}
                      height={500}
                      src={selectedPost.slider_img_two}
                      alt="Slider Img"
                    />
                  </div>
                ) : null}
                {selectedPost?.slider_img_three ? (
                  <div className="slider__result">
                    <Image
                      width={500}
                      height={500}
                      src={selectedPost.slider_img_three}
                      alt="Slider Img"
                    />
                  </div>
                ) : null}
              </Slider>
              <h1 className="title">{selectedPost.title}</h1>
              <h2 className="sub__title">Age: {selectedPost.age || 0}</h2>
              <h2 className="sub__title">
                Technique: {selectedPost.technique} {selectedPost.price}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
