// Client-side-only mailto implementation: opens user's default mail client
// Recipient: bhargavandhe202@gmail.com
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");
  const DEST_EMAIL = "bhargavandhe202@gmail.com";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      feedback.textContent = "Please fill in all fields.";
      feedback.style.color = "red";
      return;
    }

    // Build mail body
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    // Encode subject & body for mailto
    const mailtoLink = `mailto:${DEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // UX hint: show that mail client will open
    feedback.textContent = "Opening your email app to send the message...";
    feedback.style.color = "black";

    // Open user's mail client. If blocked by popup blocker, fallback to assigning location.
    try {
      window.location.href = mailtoLink;
    } catch (err) {
      // As a fallback try open
      window.open(mailtoLink, "_self");
    }
  });
});
