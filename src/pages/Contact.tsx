import "../styles/Contact.css";
import { useState } from "react";

function Contact() {
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors: string[] = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fullName.trim().length < 4) {
      newErrors.push("Full name must be at least 4 characters.");
    }

    if (subject.trim().length < 3) {
      newErrors.push("Subject must be at least 3 characters.");
    }

    if (!emailPattern.test(email)) {
      newErrors.push("Please enter a valid email.");
    }

    if (message.trim().length < 10) {
      newErrors.push("Message must be at least 10 characters.");
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      alert("Message sent!");
    }
  }

     return (
    <main>
      <h1>Contact</h1>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        <button type="submit">Send</button>
      </form>

      {errors.length > 0 && (
        <div className="contact-errors">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </main>
  );
}

export default Contact;