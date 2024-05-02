import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ContactUs = ({ props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleCheckboxChange = (itemText) => {
    setSelectedCheckboxes((prevSelected) => {
      if (prevSelected.includes(itemText)) {
        return prevSelected.filter((text) => text !== itemText);
      } else {
        return [...prevSelected, itemText];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !location ||
      !email ||
      !phone ||
      !message ||
      !selectedCheckboxes
    ) {
      setSubmissionStatus("error");
      return;
    }

    // Validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmissionStatus("error");
      alert("Invalid email format");
      return;
    }

    // Validation for phone number format (at least 10 digits)
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone)) {
      setSubmissionStatus("error");
      alert("Phone number should be at least 10 digits");
      return;
    }

    // Get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    let form = {
      name,
      location,
      email,
      phone,
      message,
      selectedCheckboxes,
      date: currentDate,
      time: currentTime,
    };

    try {
      const rawResponse = await fetch("/api/contactForm", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const content = await rawResponse.json();

      // Set success message and reset form field
      setSubmissionStatus("success");
      setIsSubmitted(true);
      setName("");
      setLocation("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSelectedCheckboxes([]);
    } catch (error) {
      // Set error message
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="form_section_main">
      <div className="form_sub_section">
        <div className="form_left_box">
          <div className="first_box">
            <h2 className="form_head_txt">{props?.contact_details?.title}</h2>
            <div className="form_flex">
              <Image width={20} height={20} src="/contact-us/phone.png" />
              <h3 className="form_sub_txt">
                {props?.contact_details?.phone_number}
              </h3>
            </div>

            <div className="form_flex">
              <Image width={20} height={20} src="/contact-us/mail.png" />
              <h3 className="form_sub_txt">{props?.contact_details?.email}</h3>
            </div>
          </div>

          <div className="first_box margin_t20">
            <h2 className="form_head_txt">Our Office</h2>
            {props?.addresses &&
              props?.addresses.map((item, id) => {
                return (
                  <div key={id}>
                    <h3 className="state">{item.city_name}</h3>
                    <div className="form_flex">
                      <Image
                        width={20}
                        height={25}
                        src="/contact-us/location.png"
                      />
                      <h3 className="form_sub_txt">{item.address}</h3>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="first_box margin_t20">
            <h2 className="form_head_txt">Follow Us</h2>
            <div className="form_flex social_flex">
              {props?.follow_us &&
                props?.follow_us.map((item, id) => {
                  return (
                    <Link href={item.url} key={id} target="_blank">
                      <Image width={20} height={20} src={item.img} />
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="form_right_box">
          <div className="right_top_box">
            <h2 className="form_head_txt">Write Us</h2>
            <h3 className="form_sub_txt">
              Enter your details and our team will get in touch
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 form_flex_row">
                <input type="hidden" name="lead_source" value="9" />
                <input type="hidden" name="page_url" value="URL of Page" />
                <label className="form_label">Name*</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                {submissionStatus === "error" && name === "" && (
                  <div className="error-message">Name is required.</div>
                )}
              </div>
              <div className="col-md-6 form_flex_row">
                <label className="form_label">Email*</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {submissionStatus === "error" && email === "" && (
                  <div className="error-message">Email is required.</div>
                )}
                {submissionStatus === "error" &&
                  email !== "" &&
                  !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
                    <div className="error-message">Invalid email format.</div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form_flex_row">
                <label className="form_label">Phone*</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {submissionStatus === "error" && phone === "" && (
                  <div className="error-message">Phone Number is required.</div>
                )}
                {submissionStatus === "error" &&
                  phone !== "" &&
                  !phone.match(/^\d{10,}$/) && (
                    <div className="error-message">
                      Number should be at least 10 digits.
                    </div>
                  )}
              </div>
              <div className="col-md-6 form_flex_row">
                <div className="down_flex_heading">
                  <label className="form_label">Preferred Location</label>
                  <Image
                    width={100}
                    height={100}
                    src="/contact-us/down.png"
                    alt="Img"
                  />
                </div>
                <select
                  id="locations"
                  name="cities"
                  value={location}
                  onChange={handleLocationChange}
                >
                  <option value="Choose"></option>
                  <option value="Delhi">Delhi</option>
                  <option value="Ludhiana">Ludhiana</option>
                  <option value="Bengaluru">Bengaluru</option>
                </select>
                {submissionStatus === "error" && location === "" && (
                  <div className="error-message">Location is required.</div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 form_flex_row">
                <label className="form_label">Your Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                {submissionStatus === "error" && message === "" && (
                  <div className="error-message">Message is required.</div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 form_flex_row">
                <div className="down_flex_heading" onClick={handleToggle}>
                  <label className="form_label" style={{ cursor: "pointer" }}>
                    Interested In
                  </label>
                  <Image
                    width={20}
                    height={20}
                    src="/contact-us/down.png"
                    alt="Img"
                    className="drop__img"
                  />
                </div>

                <div
                  className={`checkbox_box ${
                    isOpen ? "contact__box__open" : "close"
                  }`}
                >
                  {props?.interested_fields &&
                    props?.interested_fields.map((item, id) => {
                      return (
                        <>
                          <label className="checkbox_label" key={id}>
                            {item.text}
                            <input
                              type="checkbox"
                              className="checkbox_input"
                              onChange={() => handleCheckboxChange(item.text)}
                              checked={selectedCheckboxes.includes(item.text)}
                            />
                            <span class="checkmark"></span>
                          </label>
                          {submissionStatus === "error" &&
                            selectedCheckboxes.length === 0 && (
                              <div className="error-message">
                                Checkboxes is required.
                              </div>
                            )}
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="form__btn__box__bottom">
              <button
                className={`contact_form_btn ${
                  isSubmitted ? "contact__form__btn__active" : ""
                }`}
              >
                Submit
              </button>
              {submissionStatus === "success" && (
                <div className="success-message-contact-us-page">
                  Thanks for contacting AK Clinics!!
                  <br />
                  Our patient advisor will get in touch with you shortly.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
