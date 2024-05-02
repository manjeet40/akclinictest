import { useState } from "react";

const NewsLetter = ({ props }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !email || !phone) {
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
      date: currentDate,
      time: currentTime,
      page_url: currentPageUrl,
    };

    try {
      const rawResponse = await fetch("/api/submitForm", {
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
    } catch (error) {
      // Set error message
      setSubmissionStatus("error");
    }
  };
  return (
    <div className="news_letter laser_removal_news_letter">
      <div className="container">
        <h2 className="newsletter_head wow fadeInUp">{props?.heading}</h2>
        <h4 className="newsletter_subhead wow fadeInUp">{props?.subheading}</h4>
        <form onSubmit={handleSubmit}>
          <div className="form_news">
            <span className="name_input">
              <div className="form__group">
                <input type="hidden" name="lead_source" value="9" />
                <input type="hidden" name="page_url" value="URL of Page" />
                <input
                  type="text"
                  className="form__field"
                  placeholder="Name*"
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
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <label htmlFor="age" className="form__label">
                  Age
                </label>
                {submissionStatus === "error" && age === "" && (
                  <div className="error-message">Age is required.</div>
                )}
              </div>
            </span>
            <span className="name_input">
              <div className="form__group">
                <input
                  type="text"
                  className="form__field"
                  placeholder="Email*"
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
                    <div className="error-message">Invalid email format.</div>
                  )}
              </div>
            </span>
            <span className="name_input">
              <div className="form__group">
                <input
                  type="number"
                  className="form__field"
                  placeholder="Phone*"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="pone" className="form__label">
                  Phone*
                </label>
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
            </span>
            <button
              className={`newsleter_btn ${
                isSubmitted ? "news__letter__active" : ""
              }`}
            >
              SUBMIT
            </button>
            {submissionStatus === "success" && (
              <div className="success-message">
                Thanks for contacting AK Clinics!!
                <br />
                Our patient advisor will get in touch with you shortly.
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewsLetter;
