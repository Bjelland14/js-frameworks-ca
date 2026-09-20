import "../styles/Contact.css";
import { useState } from "react";

function Contact() {
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = {
      fullName: "",
      subject: "",
      email: "",
      message: "",
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    if (subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);

    if (
      !newErrors.fullName &&
      !newErrors.subject &&
      !newErrors.email &&
      !newErrors.message
    ) {
      alert("Message sent!");
    }
  }

  return (
    <main>
      <h1>Contact</h1>

      <p className="contact-intro">
        Have a question? Send us a message below.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
          {errors.fullName && (
            <p className="field-error">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            autoComplete="off"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
          {errors.subject && (
            <p className="field-error">{errors.subject}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && (
            <p className="field-error">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          {errors.message && (
            <p className="field-error">{errors.message}</p>
          )}
        </div>

        <button type="submit">Send</button>
      </form>
    </main>
  );
}

export default Contact;