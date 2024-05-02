import React, { useState, useEffect } from "react";
import styles from "../styles/scroll.module.css";
import Image from "next/image";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a scroll event listener to toggle visibility of the button
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`${styles.scrollToTopButton} ${
        isVisible ? styles.visible : ""
      }`}
      onClick={scrollToTop}
    >
      <Image width={20} height={20} src="/col-arrow-2.png" alt="Arrow" />
    </button>
  );
};

export default ScrollToTopButton;
