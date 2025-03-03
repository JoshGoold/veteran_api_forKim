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

async function sendEmailNotification(userEmail, userName, vet, subject, who) {
    console.log("made it here")
    console.log(vet)
    let htmlString = ``;
    try {
      switch (who) {
        case "prof":
          htmlString = `
          <div style="background: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin: auto;">
              <h1 style="color: #333; text-align: center;">New Research Selection</h1>
              <p style="font-size: 16px; text-align: center;">${userName} is now researching <strong>${vet.name}</strong></p>
              <hr style="border: 0; height: 1px; background: #ccc; margin: 20px 0;">
              
              <h2 style="color: #444;">Veteran Details</h2>
              <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 20px;">
                <li><strong>Name:</strong> ${vet.name}</li>
                <li><strong>From:</strong> ${vet.from}</li>
                <li><strong>Death:</strong> ${vet.death}</li>
                <li><strong>Inscribed:</strong> ${vet.inscribed}</li>
                <li><strong>Squadron:</strong> ${vet.squadron}</li>
                <li><strong>Grave:</strong> ${vet.grave}</li>
                <li><strong>Full Description:</strong> ${vet.full_description}</li>
              </ul>
  
              <hr style="border: 0; height: 1px; background: #ccc; margin: 20px 0;">
  
              <h2 style="color: #444;">Student Information</h2>
              <p><strong>Name:</strong> ${userName}</p>
              <p><strong>Email:</strong> <a href="mailto:${userEmail}" style="color: #007bff;">${userEmail}</a></p>
  
              <div style="text-align: center; margin-top: 20px;">
                <a href="mailto:${userEmail}" style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                  Contact Student
                </a>
              </div>
            </div>
          </div>
          `;
          break;
  
        case "student":
          htmlString = `
          <div style="background: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin: auto;">
              <h1 style="color: #333; text-align: center;">You've Selected ${vet.name}</h1>
              <p style="font-size: 16px; text-align: center;">We will send you an email in 4-6 weeks to check your progress.</p>
  
              <hr style="border: 0; height: 1px; background: #ccc; margin: 20px 0;">
  
              <h2 style="color: #444;">Veteran Details</h2>
              <ul style="list-style: none; padding: 0;  display: flex; flex-direction: column; gap: 20px;">
                <li><strong>Name:</strong> ${vet.name}</li>
                <li><strong>From:</strong> ${vet.from}</li>
                <li><strong>Death:</strong> ${vet.death}</li>
                <li><strong>Inscribed:</strong> ${vet.inscribed}</li>
                <li><strong>Squadron:</strong> ${vet.squadron}</li>
                <li><strong>Grave:</strong> ${vet.grave}</li>
                <li><strong>Full Description:</strong> ${vet.full_description}</li>
              </ul>
  
              <hr style="border: 0; height: 1px; background: #ccc; margin: 20px 0;">
  
              <h2 style="color: #444; text-align: center;">Need Help?</h2>
              <p style="text-align: center;">If you have any questions, feel free to contact us:</p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="mailto:drkimbergeron@gmail.com" style="display: inline-block; padding: 10px 20px; background: #28a745; color: white; text-decoration: none; border-radius: 5px;">
                  Contact Dr. Kim Bergeron
                </a>
              </div>
            </div>
          </div>
          `;
          break;
      }
     
      console.log("html chosen: ", htmlString)
  
      const info = await transporter.sendMail({
        from: `"WWII Research Guide" <${process.env.USERNAME}>`,
        to: who === "prof" ? "joshgoold2@hotmail.com" : userEmail,
        subject,
        html: htmlString,
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