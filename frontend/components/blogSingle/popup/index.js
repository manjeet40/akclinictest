import React, { useState } from "react";

const CallbackPopup = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !email || !phone || !message) {
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

    // Get the current page URL
    const currentPageUrl = window.location.href;

    let form = {
      name,
      age,
      email,
      phone,
      message,
      date: currentDate,
      time: currentTime,
      page_url: currentPageUrl,
    };

    try {
      const rawResponse = await fetch("/api/popupForm", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const content = await rawResponse.json();

      // Set success message and reset form fields
      setSubmissionStatus("success");
      setIsSubmitted(true);
      setName("");
      setAge("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      // Set error message
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="callback-popup">
      <div className="popup-content">
        {/* Your popup content here */}

        <div className="popup__close__box">
          <div className="popup__cont__head__box">
            <h2 className="call__back__heading">Request A Call Back</h2>
            <h4 className="call__back__subheading">
              Enter your details and our team will get in touch
            </h4>
          </div>

          <button onClick={handleClose} className="popup__close__btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 30 30"
            >
              <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
            </svg>
          </button>
        </div>

        <div className="news_letter laser_removal_news_letter">
          <div className="container">
            <form onSubmit={handleSubmit} className="form_news">
              <div>
                <span className="name_input">
                  <div className="form__group">
                    <input type="hidden" name="lead_source" value="9" />
                    <input type="hidden" name="page_url" value="URL of Page" />
                    <input
                      type="text"
                      className="form__field"
                      placeholder="Name*"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name" className="form__label">
                      Name*
                    </label>
                    {submissionStatus === "error" && name === "" && (
                      <div className="error-message">Name is required.</div>
                    )}
                  </div>
                </span>
                <span className="age_input">
                  <div className="form__group">
                    <input
                      type="number"
                      className="form__field"
                      placeholder="Age*"
                      name="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <label htmlFor="age" className="form__label">
                      Age*
                    </label>
                    {submissionStatus === "error" && age === "" && (
                      <div className="error-message">Age is required.</div>
                    )}
                  </div>
                </span>
              </div>

              <div>
                <span className="name_input">
                  <div className="form__group">
                    <input
                      type="email"
                      className="form__field"
                      placeholder="Email*"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email" className="form__label">
                      Email*
                    </label>
                    {submissionStatus === "error" && email === "" && (
                      <div className="error-message">Email is required.</div>
                    )}
                    {submissionStatus === "error" &&
                      email !== "" &&
                      !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
                        <div className="error-message">
                          Invalid email format.
                        </div>
                      )}
                  </div>
                </span>
                <span className="name_input">
                  <div className="form__group">
                    <input
                      type="tel"
                      className="form__field"
                      placeholder="Phone*"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="phone" className="form__label">
                      Phone*
                    </label>
                    {submissionStatus === "error" && phone === "" && (
                      <div className="error-message">
                        Phone Number is required.
                      </div>
                    )}
                    {submissionStatus === "error" &&
                      phone !== "" &&
                      !phone.match(/^\d{10,}$/) && (
                        <div className="error-message">
                          Number should be at least 10 digits.
                        </div>
                      )}
                  </div>
                </span>
              </div>
              <div>
                <span className="name_input">
                  <div className="form__group">
                    <textarea
                      type="textarea"
                      className="form__field"
                      placeholder="Message*"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <label htmlFor="phone" className="form__label">
                      Message*
                    </label>
                    {submissionStatus === "error" && message === "" && (
                      <div className="error-message">Message is required.</div>
                    )}
                  </div>
                </span>
              </div>
              <div className="popup__btn__box">
                <button
                  className={`popup__btn ${
                    isSubmitted ? "popup__btn__active" : ""
                  }`}
                >
                  SUBMIT
                </button>
                {submissionStatus === "success" && (
                  <div className="success-message-popup">
                    Thanks for contacting AK Clinics!!
                    <br />
                    Our patient advisor will get in touch with you shortly.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallbackPopup;
