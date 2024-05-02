import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = (props) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState("");

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [hairSubmenuOpen, setHairSubmenuOpen] = useState(false);
  const [skinSubmenuOpen, setSkinSubmenuOpen] = useState(false);
  const [cosmeticSubmenuOpen, setCosmeticSubmenuOpen] = useState(false);
  const [resourcesSubmenuOpen, setResourcesSubmenuOpen] = useState(false);
  const [resultsSubmenuOpen, setResultsSubmenuOpen] = useState(false);

  const isBlogPage = router.asPath.startsWith("/blog");

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Function to toggle body overflow
    const toggleBodyOverflow = () => {
      if (dropdownOpen) {
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
  }, [dropdownOpen]);

  const closeAllSubmenus = () => {
    setSubmenuOpen(false);
    setHairSubmenuOpen(false);
    setSkinSubmenuOpen(false);
    setCosmeticSubmenuOpen(false);
    setResourcesSubmenuOpen(false);
    setResultsSubmenuOpen(false);
  };

  // Close all submenus and main dropdown menu after a delay
  const closeMenuWithDelay = () => {
    closeAllSubmenus();
    setDropdownOpen(false);
  };

  // Close all submenus when the route changes
  useEffect(() => {
    const handleRouteChange = () => {
      closeAllSubmenus();
      setDropdownOpen(false); // Close main dropdown menu
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  // Function to handle link clicks
  const handleLinkClick = () => {
    closeAllSubmenus();
    setTimeout(() => {
      setDropdownOpen(false);
    }, 2000); // Adjust the delay (in milliseconds) as needed
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 48) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setLogoSrc(
      isScrolled ? "/logo.svg" : `${props?.commonData?.header?.logo?.url}`
    );
  }, [isScrolled]);

  // if (!logoSrc) {
  //   return <div style={{ color: "#FFF" }}>...Loading</div>;
  // }

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const toggleHairSubmenu = () => {
    setHairSubmenuOpen(!hairSubmenuOpen);
  };

  const toggleSkinSubmenu = () => {
    setSkinSubmenuOpen(!skinSubmenuOpen);
  };

  const toggleCosmeticSubmenu = () => {
    setCosmeticSubmenuOpen(!cosmeticSubmenuOpen);
  };

  const toggleResourcesSubmenu = () => {
    setResourcesSubmenuOpen(!resourcesSubmenuOpen);
  };

  const toggleResultsSubmenu = () => {
    setResultsSubmenuOpen(!resultsSubmenuOpen);
  };

  const toggleSubmenuBack = () => {
    setSubmenuOpen(false);
  };

  const toggleHairSubmenuBack = () => {
    setHairSubmenuOpen(false);
  };

  const toggleSkinSubmenuBack = () => {
    setSkinSubmenuOpen(false);
  };

  const toggleCosmeticSubmenuBack = () => {
    setCosmeticSubmenuOpen(false);
  };

  const toggleResourcesSubmenuBack = () => {
    setResourcesSubmenuOpen(false);
  };

  const toggleResultsSubmenuBack = () => {
    setResultsSubmenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="header">
        <div className="header_top">
          <div className="container">
            <div className="header_row">
              <div className="header_top_left">
                <div
                  className="icon_text"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(`tel:${props?.commonData?.header?.phone}`)
                  }
                >
                  <Image
                    src="/phone_icon.jpg"
                    width={15}
                    height={15}
                    priority
                  />
                  <span className="text">
                    {props?.commonData?.header?.phone}
                  </span>
                </div>
                <div
                  className="icon_text"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(`mailto:${props?.commonData?.header?.email}`)
                  }
                >
                  <Image src="/mail.jpg" width={15} height={15} priority />
                  <span className="text">
                    {props?.commonData?.header?.email}
                  </span>
                </div>
              </div>
              <div className="header_top_right">
                <div
                  className="icon_text social__icon__header"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(`${props?.commonData?.social_links?.facebook}`)
                  }
                >
                  <Image
                    src="/facebook_icon.jpg"
                    width={17}
                    height={17}
                    priority
                  />
                </div>
                <div
                  className="icon_text social__icon__header"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(`${props?.commonData?.social_links?.linkedin}`)
                  }
                >
                  <Image
                    src="/linkedin_icon.jpg"
                    width={15}
                    height={15}
                    priority
                  />
                </div>
                <div
                  className="icon_text social__icon__header"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(`${props?.commonData?.social_links?.instagram}`)
                  }
                >
                  <Image
                    src="/insta_icon.jpg"
                    width={17}
                    height={17}
                    priority
                  />
                </div>
                <div
                  className="icon_text social__icon__header"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(`${props?.commonData?.social_links?.youtube}`)
                  }
                >
                  <Image src="/yt_icon.jpg" width={17} height={13} priority />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header_bottom">
          <div className="container">
            <div className="header_row">
              <div
                style={{ cursor: "pointer" }}
                className={isScrolled ? "dark-header" : "light-header"}
              >
                <Link href="/" target="">
                  <Image
                    src={logoSrc}
                    width={230}
                    height={63}
                    priority
                    className="main_logo"
                  />
                </Link>
              </div>
              <div className="for_mob">
                <div
                  className={dropdownOpen ? "nav-icon1 open" : "nav-icon1"}
                  onClick={toggle}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                {windowWidth <= 1024 && dropdownOpen && (
                  <div className="menu">
                    <div>
                      <div
                        className={`link ${
                          router.pathname === "#" ? "active__link__mobile" : ""
                        }`}
                      >
                        <div className="mobile__link__box">
                          <Link href={`#`}>
                            <span className="mobile__link">About</span>
                          </Link>
                          <button onClick={toggleSubmenu}>
                            {submenuOpen ? (
                              <i className="fas fa-minus">-</i>
                            ) : (
                              <i className="fas fa-plus">+</i>
                            )}
                          </button>
                        </div>
                      </div>
                      <div
                        className={`submenu__mobile ${
                          submenuOpen ? "open" : ""
                        }`}
                      >
                        <button
                          onClick={toggleSubmenuBack}
                          className="back__btn__mobile"
                        >
                          Back
                        </button>
                        <ul className="submenu-list__mobile">
                          {props?.commonData?.header?.header_links
                            ?.about_header_links &&
                            props?.commonData?.header?.header_links?.about_header_links.map(
                              (item, id) => {
                                return (
                                  <li className="submenu-item" key={id}>
                                    <Link
                                      prefetch={false}
                                      target=""
                                      href={`${item.url}`}
                                      className="submenu-link"
                                    >
                                      {item.page_name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`link ${
                          router.pathname === "/hair-transplant"
                            ? "active__link__mobile"
                            : ""
                        }`}
                      >
                        <div className="mobile__link__box">
                          <Link href={`#`}>
                            <span className="mobile__link">Hair</span>
                          </Link>
                          <button onClick={toggleHairSubmenu}>
                            {hairSubmenuOpen ? (
                              <i className="fas fa-minus">-</i>
                            ) : (
                              <i className="fas fa-plus">+</i>
                            )}
                          </button>
                        </div>
                      </div>
                      <div
                        className={`submenu__mobile ${
                          hairSubmenuOpen ? "open" : ""
                        }`}
                      >
                        <button
                          onClick={toggleHairSubmenuBack}
                          className="back__btn__mobile"
                        >
                          Back
                        </button>
                        <ul className="submenu-list__mobile">
                          <li className="submenu-item">
                            <h4 className="mobile__menu__sub__heading">
                              <Link
                                prefetch={false}
                                href={
                                  props?.commonData?.header?.header_links
                                    ?.hair_header_links?.parent_page_url
                                }
                                target=""
                              >
                                {
                                  props?.commonData?.header?.header_links
                                    ?.hair_header_links?.parent_page_name
                                }
                              </Link>
                            </h4>
                          </li>
                          {props?.commonData?.header?.header_links
                            ?.hair_header_links?.page_links &&
                            props?.commonData?.header?.header_links?.hair_header_links?.page_links.map(
                              (item, id) => {
                                return (
                                  <li className="submenu-item" key={id}>
                                    <Link
                                      prefetch={false}
                                      target=""
                                      href={item.url}
                                      className="submenu-link"
                                    >
                                      {item.page_name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}

                          <Link
                            prefetch={false}
                            target=""
                            href={
                              props?.commonData?.header?.header_links
                                ?.hair_loss_header_links?.parent_page_url
                            }
                            className=""
                          >
                            <h4 className="mobile__menu__sub__heading">
                              {
                                props?.commonData?.header?.header_links
                                  ?.hair_loss_header_links?.parent_page_name
                              }
                            </h4>
                          </Link>
                          {props?.commonData?.header?.header_links
                            ?.hair_loss_header_links?.page_links &&
                            props?.commonData?.header?.header_links?.hair_loss_header_links?.page_links.map(
                              (item, id) => {
                                return (
                                  <li className="submenu-item" key={id}>
                                    <Link
                                      prefetch={false}
                                      target=""
                                      href={item.url}
                                      className="submenu-link"
                                    >
                                      {item.page_name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}

                          <Link
                            prefetch={false}
                            target=""
                            href={
                              props?.commonData?.header?.header_links
                                ?.hair_restoration_header_links?.parent_page_url
                            }
                          >
                            <h4 className="mobile__menu__sub__heading">
                              {
                                props?.commonData?.header?.header_links
                                  ?.hair_restoration_header_links
                                  ?.parent_page_name
                              }
                            </h4>
                          </Link>
                          {props?.commonData?.header?.header_links
                            ?.hair_restoration_header_links?.page_links &&
                            props?.commonData?.header?.header_links?.hair_restoration_header_links?.page_links.map(
                              (item, id) => {
                                return (
                                  <li className="submenu-item" key={id}>
                                    <Link
                                      prefetch={false}
                                      target=""
                                      href={item.url}
                                      className="submenu-link"
                                    >
                                      {item.page_name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="mobile__link__box">
                        <span className="mobile__link">
                          <Link prefetch={false} href={`/cosmetology`}>
                            Skin
                          </Link>
                        </span>
                        <button onClick={toggleSkinSubmenu}>
                          {skinSubmenuOpen ? (
                            <i className="fas fa-minus">-</i>
                          ) : (
                            <i className="fas fa-plus">+</i>
                          )}
                        </button>

                        <div
                          className={`submenu__mobile ${
                            skinSubmenuOpen ? "open" : ""
                          }`}
                        >
                          <button
                            onClick={toggleSkinSubmenuBack}
                            className="back__btn__mobile"
                          >
                            Back
                          </button>

                          <ul className="submenu-list__mobile">
                            {" "}
                            {props?.commonData?.header?.header_links
                              ?.skin_header_links?.page_links &&
                              props?.commonData?.header?.header_links?.skin_header_links?.page_links.map(
                                (item, id) => {
                                  return (
                                    <li className="submenu-item" key={id}>
                                      <Link
                                        prefetch={false}
                                        target=""
                                        href={item.url}
                                        className="submenu-link"
                                      >
                                        {item.page_name}
                                      </Link>
                                    </li>
                                  );
                                }
                              )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mobile__link__box">
                        <span className="mobile__link">
                          <Link prefetch={false} href={`/cosmetic-surgery`}>
                            Cosmetic Surgeries
                          </Link>
                        </span>
                        <button onClick={toggleCosmeticSubmenu}>
                          {cosmeticSubmenuOpen ? (
                            <i className="fas fa-minus">-</i>
                          ) : (
                            <i className="fas fa-plus">+</i>
                          )}
                        </button>

                        <div
                          className={`submenu__mobile ${
                            cosmeticSubmenuOpen ? "open" : ""
                          }`}
                        >
                          <button
                            onClick={toggleCosmeticSubmenuBack}
                            className="back__btn__mobile"
                          >
                            Back
                          </button>

                          <ul className="submenu-list__mobile">
                            {props?.commonData?.header?.header_links
                              ?.cosmetic_header_links?.page_links &&
                              props?.commonData?.header?.header_links?.cosmetic_header_links?.page_links.map(
                                (item, id) => {
                                  return (
                                    <li className="submenu-item" key={id}>
                                      <Link
                                        prefetch={false}
                                        target=""
                                        href={item.url}
                                        className="submenu-link"
                                      >
                                        {item.page_name}
                                      </Link>
                                    </li>
                                  );
                                }
                              )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mobile__link__box">
                        <span className="mobile__link">Results</span>
                        <button onClick={toggleResultsSubmenu}>
                          {resultsSubmenuOpen ? (
                            <i className="fas fa-minus">-</i>
                          ) : (
                            <i className="fas fa-plus">+</i>
                          )}
                        </button>

                        <div
                          className={`submenu__mobile ${
                            resultsSubmenuOpen ? "open" : ""
                          }`}
                        >
                          <button
                            onClick={toggleResultsSubmenuBack}
                            className="back__btn__mobile"
                          >
                            Back
                          </button>

                          <ul className="submenu-list__mobile">
                            {props?.commonData?.header?.header_links
                              ?.results_header_links &&
                              props?.commonData?.header?.header_links?.results_header_links.map(
                                (item, id) => {
                                  return (
                                    <li className="submenu-item" key={id}>
                                      <Link
                                        prefetch={false}
                                        target=""
                                        href={item.url}
                                        className="submenu-link"
                                      >
                                        {item.page_name}
                                      </Link>
                                    </li>
                                  );
                                }
                              )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mobile__link__box">
                        <span className="mobile__link">Resources</span>
                        <button onClick={toggleResourcesSubmenu}>
                          {resourcesSubmenuOpen ? (
                            <i className="fas fa-minus">-</i>
                          ) : (
                            <i className="fas fa-plus">+</i>
                          )}
                        </button>

                        <div
                          className={`submenu__mobile ${
                            resourcesSubmenuOpen ? "open" : ""
                          }`}
                        >
                          <button
                            onClick={toggleResourcesSubmenuBack}
                            className="back__btn__mobile"
                          >
                            Back
                          </button>

                          <ul className="submenu-list__mobile">
                            {props?.commonData?.header?.header_links
                              ?.location_mobile_header_links &&
                              props?.commonData?.header?.header_links?.location_mobile_header_links.map(
                                (item, id) => {
                                  return (
                                    <li
                                      className="submenu-item location__sub__menu"
                                      key={id}
                                    >
                                      <Link
                                        prefetch={false}
                                        target=""
                                        href={item.page_url}
                                        className="submenu-link"
                                      >
                                        {item.page_name}
                                      </Link>
                                    </li>
                                  );
                                }
                              )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* <div className="mobile__link__box">
                      <div
                        className={`link ${
                          router.pathname === "/products"
                            ? "active__link__mobile"
                            : ""
                        }`}
                      >
                        <Link href={`/products`}>
                          <span className="mobile__link">Products</span>
                        </Link>
                      </div>
                    </div> */}

                    <div className="mobile__link__box">
                      <div
                        className={`link ${
                          router.pathname === "/contact-us"
                            ? "active__link__mobile"
                            : ""
                        }`}
                      >
                        <Link href="/contact-us" prefetch={false}>
                          <span className="mobile__link">Contact Us</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="header_bottom_right">
                <div className="menu-item menu-dropdown megamenu-btn-1">
                  <Link href="#" target="">
                    <div
                      className={`link ${
                        router.pathname === "#" ? "active-menu" : ""
                      }`}
                    >
                      ABOUT
                    </div>
                  </Link>
                  <div className="submenu megamenu megamenu-column-1">
                    <ul className="submenu-list">
                      {props?.commonData?.header?.header_links
                        ?.about_header_links &&
                        props?.commonData?.header?.header_links?.about_header_links.map(
                          (item, id) => {
                            return (
                              <li className="submenu-item" key={id}>
                                <Link
                                  target=""
                                  href={`${item.url}`}
                                  className="submenu-link"
                                >
                                  {item.page_name}
                                </Link>
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </div>
                </div>
                <div className="menu-item menu-dropdown megamenu-btn-2">
                  <Link href="#" target="" prefetch={false}>
                    <div
                      className={`link ${
                        router.pathname === "#" ? "active-menu" : ""
                      }`}
                    >
                      HAIR
                    </div>
                  </Link>
                  <div className="submenu megamenu megamenu-column-2">
                    <ul className="submenu-list">
                      <div className="mega__menu__flex">
                        <div className="mega__menu__image__box">
                          <Image
                            src={
                              props?.commonData?.header?.header_links
                                ?.hair_header_links?.img
                            }
                            width={200}
                            height={200}
                            alt="Img Mega Menu"
                            className="mega__menu__image"
                          />
                        </div>
                        <div className="align__self__mega__menu hair__mega">
                          <li className="submenu-item">
                            <h4 className="mega__menu__sub__heading">
                              <Link
                                prefetch={false}
                                href={
                                  props?.commonData?.header?.header_links
                                    ?.hair_header_links?.parent_page_url
                                }
                                target=""
                              >
                                {
                                  props?.commonData?.header?.header_links
                                    ?.hair_header_links?.parent_page_name
                                }
                              </Link>
                            </h4>
                          </li>
                          {props?.commonData?.header?.header_links
                            ?.hair_header_links?.page_links &&
                            props?.commonData?.header?.header_links?.hair_header_links?.page_links.map(
                              (item, id) => {
                                return (
                                  <li className="submenu-item" key={id}>
                                    <Link
                                      prefetch={false}
                                      target=""
                                      href={item.url}
                                      className="submenu-link"
                                    >
                                      {item.page_name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                        </div>

                        <div className="align__self__mega__menu">
                          <Link
                            prefetch={false}
                            target=""
                            href={
                              props?.commonData?.header?.header_links
                                ?.hair_restoration_header_links?.parent_page_url
                            }
                          >
                            <h4 className="mega__menu__sub__heading">
                              {
                                props?.commonData?.header?.header_links
                                  ?.hair_restoration_header_links
                                  ?.parent_page_name
                              }
                            </h4>
                          </Link>
                          {props?.commonData?.header?.header_links
                            ?.hair_restoration_header_links?.page_links &&
                            props?.commonData?.header?.header_links?.hair_restoration_header_links?.page_links.map(
                              (item, id) => {
                                return (
                                  <li className="submenu-item" key={id}>
                                    <Link
                                      prefetch={false}
                                      target=""
                                      href={item.url}
                                      className="submenu-link"
                                    >
                                      {item.page_name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                        </div>
                        <div className="align__self__mega__menu">
                          <Link
                            prefetch={false}
                            target=""
                            href={
                              props?.commonData?.header?.header_links
                                ?.hair_loss_header_links?.parent_page_url
                            }
                            className=""
                          >
                            <h4 className="mega__menu__sub__heading">
                              {
                                props?.commonData?.header?.header_links
                                  ?.hair_loss_header_links?.parent_page_name
                              }
                            </h4>
                          </Link>

                          {props?.commonData?.header?.header_links
                            ?.hair_loss_header_links?.page_links &&
                            props?.commonData?.header?.header_links?.hair_loss_header_links?.page_links.map(
                              (item, id) => {
                                return (
                                  <li className="submenu-item" key={id}>
                                    <Link
                                      prefetch={false}
                                      target=""
                                      href={item.url}
                                      className="submenu-link"
                                    >
                                      {item.page_name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="menu-item menu-dropdown megamenu-btn-3">
                  <Link prefetch={false} href="/cosmetology" target="">
                    <div
                      className={`link ${
                        router.pathname === "#" ? "active-menu" : ""
                      }`}
                    >
                      {
                        props?.commonData?.header?.header_links
                          ?.skin_header_links?.parent_page_name
                      }
                    </div>
                  </Link>
                  <div className="submenu megamenu megamenu-column-3">
                    <ul className="submenu-list">
                      <div className="mega__menu__flex skin__mega__flex">
                        <div className="mega__menu__image__box__col__3">
                          <Image
                            src={
                              props?.commonData?.header?.header_links
                                ?.skin_header_links?.img
                            }
                            width={200}
                            height={200}
                            alt="Img Mega Menu"
                            className="mega__menu__image"
                          />
                        </div>
                        <div className="align__self__mega__menu skin__mega__links">
                          {props?.commonData?.header?.header_links
                            ?.skin_header_links?.page_links &&
                            props?.commonData?.header?.header_links?.skin_header_links?.page_links.map(
                              (item, id) => {
                                return (
                                  <li className="submenu-item" key={id}>
                                    <Link
                                      prefetch={false}
                                      target=""
                                      href={item.url}
                                      className="submenu-link"
                                    >
                                      {item.page_name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="menu-item menu-dropdown megamenu-btn-3">
                  <Link
                    prefetch={false}
                    target=""
                    href={
                      props?.commonData?.header?.header_links
                        ?.cosmetic_header_links?.parent_page_url
                    }
                  >
                    <div
                      className={`link ${
                        router.pathname === "/cosmetic-surgery"
                          ? "active-menu"
                          : ""
                      }`}
                    >
                      {
                        props?.commonData?.header?.header_links
                          ?.cosmetic_header_links?.parent_page_name
                      }
                    </div>
                  </Link>
                  <div className="submenu megamenu megamenu-column-4">
                    <ul className="submenu-list">
                      <div className="mega__menu__flex skin__mega__flex">
                        <div className="mega__menu__image__box__col__4">
                          <Image
                            src={
                              props?.commonData?.header?.header_links
                                ?.cosmetic_header_links?.img
                            }
                            width={200}
                            height={200}
                            alt="Img Mega Menu"
                            className="mega__menu__image"
                          />
                        </div>
                        <div className="align__self__mega__menu cosmetic__mega__links">
                          {props?.commonData?.header?.header_links
                            ?.cosmetic_header_links?.page_links &&
                            props?.commonData?.header?.header_links?.cosmetic_header_links?.page_links.map(
                              (item, id) => {
                                return (
                                  <li className="submenu-item" key={id}>
                                    <Link
                                      prefetch={false}
                                      target=""
                                      href={item.url}
                                      className="submenu-link"
                                    >
                                      {item.page_name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="menu-item menu-dropdown megamenu-btn-4">
                  <Link href="#">
                    <div
                      className={`link ${
                        router.pathname === "#" ? "active-menu" : ""
                      }`}
                    >
                      RESULTS
                    </div>
                  </Link>

                  <div className="submenu megamenu megamenu-column-5">
                    <ul className="submenu-list">
                      <div className="mega__menu__flex">
                        <div>
                          {props?.commonData?.header?.header_links
                            ?.results_header_links &&
                            props?.commonData?.header?.header_links?.results_header_links.map(
                              (item, id) => {
                                return (
                                  <li className="submenu-item" key={id}>
                                    <Link
                                      prefetch={false}
                                      target=""
                                      href={item.url}
                                      className="submenu-link"
                                    >
                                      {item.page_name}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="menu-item menu-dropdown megamenu-btn-3">
                  <Link href="#">
                    <div
                      className={`link ${
                        router.pathname === "/resources" ? "active-menu" : ""
                      }`}
                    >
                      RESOURCES
                    </div>
                  </Link>
                  <div className="submenu megamenu megamenu-column-5">
                    <ul className="submenu-list location__sub__menu__box">
                      <div className="mega__menu__flex">
                        <div>
                          {props?.commonData?.header?.header_links
                            ?.resources_header_links &&
                            props?.commonData?.header?.header_links?.resources_header_links.map(
                              (item, id) => {
                                return (
                                  <li
                                    className="submenu-item location__sub__menu"
                                    key={id}
                                  >
                                    <Link
                                      prefetch={false}
                                      target=""
                                      href={item.url}
                                      className="submenu-link"
                                    >
                                      {item.page_name}
                                    </Link>

                                    {id ===
                                      props?.commonData?.header?.header_links
                                        ?.resources_header_links.length -
                                        1 && (
                                      <div className="category__sub__menu__links">
                                        <ul>
                                          <li>
                                            <Link
                                              prefetch={false}
                                              href="/blog/patients-ask"
                                              className="submenu-link"
                                              target=""
                                            >
                                              Patients Ask?
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              prefetch={false}
                                              href="/blog/success-stories"
                                              className="submenu-link"
                                              target=""
                                            >
                                              Success Stories
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              prefetch={false}
                                              href="/blog/case-study"
                                              className="submenu-link"
                                              target=""
                                            >
                                              Case Study
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              prefetch={false}
                                              href="/blog/hair-transplant-articles"
                                              className="submenu-link"
                                              target=""
                                            >
                                              Hair Transplant Articles
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              prefetch={false}
                                              href="/blog/news-and-events"
                                              className="submenu-link"
                                              target=""
                                            >
                                              News and Events
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              prefetch={false}
                                              href="/blog/hair-loss-articles"
                                              className="submenu-link"
                                              target=""
                                            >
                                              Hair Loss Articles
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              prefetch={false}
                                              href="/blog/hair-loss-treatments"
                                              className="submenu-link"
                                              target=""
                                            >
                                              Hair Loss Treatment Articles
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              prefetch={false}
                                              href="/blog/medical-treatment-articles"
                                              className="submenu-link"
                                              target=""
                                            >
                                              Medical Treatment Articles
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              prefetch={false}
                                              href="/blog/cosmetic-surgery-articles"
                                              className="submenu-link"
                                              target=""
                                            >
                                              Cosmetic Surgery Articles
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              prefetch={false}
                                              href="/blog/cosmetology"
                                              className="submenu-link"
                                              target=""
                                            >
                                              Cosmetology
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              prefetch={false}
                                              href="/blog/styleshala"
                                              className="submenu-link"
                                              target=""
                                            >
                                              Styleshala
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                    )}

                                    {(id ===
                                      props?.commonData?.header?.header_links
                                        ?.resources_header_links.length) ==
                                      0 && (
                                      <div className="location__sub__menu__links">
                                        {props?.commonData?.header?.header_links
                                          ?.location_header_links &&
                                          props?.commonData?.header?.header_links?.location_header_links.map(
                                            (item, id) => {
                                              return (
                                                <ul key={id}>
                                                  <Link
                                                    prefetch={false}
                                                    target=""
                                                    href={item.url}
                                                    className="submenu-link"
                                                  >
                                                    <li>{item.page_name}</li>
                                                  </Link>
                                                </ul>
                                              );
                                            }
                                          )}
                                      </div>
                                    )}
                                  </li>
                                );
                              }
                            )}
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                {/* <Link href="/products">
                  <div
                    className={`link ${
                      router.pathname === "/products" ? "active-menu" : ""
                    }`}
                  >
                    PRODUCTS
                  </div>
                </Link> */}
                <Link href="/contact-us" target="" prefetch={false}>
                  <span
                    className={`links btn ${
                      router.pathname === "/contact-us"
                        ? "active-contact-btn"
                        : ""
                    }`}
                  >
                    CONTACT US
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
