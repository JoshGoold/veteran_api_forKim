const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USERNAME, // ✅ Use proper env names
    pass: process.env.PASSWORD,
  },
});

async function sendEmailNotification(userEmail, userName, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: `"WWII Research Guide" <${process.env.USERNAME}>`,
      to: userEmail,
      subject,
      text,
      html: `
        <div>
            <h1>Hello ${userName}, we have received your submission.</h1>
            <p>Thank you for choosing our company!</p>
            <ul>
                <li><h2>Have any questions?</h2></li>
                <li>Call us: 289-251-5555</li>
                <li>Email us: <a href="mailto:mail@mail.com">mail@mail.com</a></li>
            </ul>
            <p>We appreciate your business. Have a great day!</p>
        </div>
      `,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

async function formCaptureEmail(userEmail, userName, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: `"WWII Research Guide" <${process.env.USERNAME}>`,
      to: "joshgoold2@hotmail.com",
      subject,
      text,
      html: `
        <div>
          <h1>You've received a new lead</h1>
          <ul>
            <li><strong>Full Name:</strong> ${userName}</li>
            <li><strong>Email:</strong> ${userEmail}</li>
            <li><strong>Phone:</strong> ${userPhone}</li>
            <li><strong>Message:</strong> ${userMessage}</li>
          </ul>
        </div>
      `,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

async function sendTwoFactorAuth(userEmail, code, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: `"WWII Research Guide" <${process.env.USERNAME}>`,
      to: userEmail,
      subject,
      text,
      html: `
        <div>
          <h1>Your Two Factor Auth Code</h1>
          <ul>
            <li><h2>${code}</h2></li>
          </ul>
        </div>
      `,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = {sendEmailNotification, sendTwoFactorAuth, formCaptureEmail}