import nodemailer from "nodemailer";

export const runtime = "nodejs";

const projectTypes = new Set([
  "Website",
  "Web application",
  "CMS or API integration",
  "Other",
]);

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const hasControlCharacters = (value) => /[\u0000-\u001F\u007F]/.test(value);

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (
    !name || name.length > 120 || hasControlCharacters(name) ||
    !email || email.length > 254 || hasControlCharacters(email) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !projectTypes.has(subject) ||
    !message || message.length > 6000
  ) {
    return Response.json({ success: false, message: "Please check the form fields and try again." }, { status: 400 });
  }

  const inbox = process.env.EMAIL_USER;
  const appPassword = process.env.EMAIL_PASS;

  if (!inbox || !appPassword) {
    return Response.json({ success: false, message: "Email delivery is not configured." }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: inbox, pass: appPassword },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");

    await transporter.sendMail({
      from: { name: "Portfolio contact form", address: inbox },
      to: inbox,
      replyTo: { name, address: email },
      subject: `Portfolio inquiry: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${subject}\n\n${message}`,
      html: `
        <h2>New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Project type:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong><br>${safeMessage}</p>
      `,
    });

    return Response.json({ success: true, message: "Email sent." });
  } catch (error) {
    console.error("Contact form email delivery failed.", error);
    return Response.json({ success: false, message: "Unable to send your message right now." }, { status: 500 });
  }
}
