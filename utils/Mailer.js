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
          <div style="background: #f5f7fa; padding: 40px 20px; font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
    <!-- Header Section -->
    <div style="background: linear-gradient(135deg, #2c3e50, #3498db); padding: 30px 20px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 600;">Welcome to the AURP, ${vet.name}</h1>
    </div>

    <!-- Content Section -->
    <div style="padding: 30px 25px; color: #333333;">
      <p style="font-size: 16px; margin: 0 0 20px; text-align: center;">
        Thank you for joining the <strong>Acadia University Recovery Program (AURP)</strong> to research and write the life story of a fallen WWII hero. We're excited to have you on board!
      </p>
      <p style="font-size: 16px; margin: 0 0 20px; text-align: center;">
        To begin, use the veteran details below along with our <a href="https://ww2-canadian-mia-aircrew-database.org/research-guide" style="color: #3498db; text-decoration: none; font-weight: 500;">research guide</a> available on our website.
      </p>
      <p style="font-size: 16px; margin: 0 0 20px; text-align: center;">
        For additional mission details (e.g., flight information or casualty lists), visit the <a href="https://www.rcafassociation.ca/heritage/history/fallen-aviators/rcaf-casualties-second-world-war/" style="color: #3498db; text-decoration: none; font-weight: 500;">RCAF Fallen Aviators database</a>. Search alphabetically for the listed name to find more information.
      </p>
      <p style="font-size: 16px; margin: 0 0 20px; text-align: center;">
        When your report is ready, submit it by emailing <a href="mailto:researchassistantkim@gmail.com" style="color: #3498db; text-decoration: none; font-weight: 500;">researchassistantkim@gmail.com</a> or use the submission link on our <a href="https://ww2-canadian-mia-aircrew-database.org/" style="color: #3498db; text-decoration: none; font-weight: 500;">database homepage</a> under "4. Submit."
      </p>
      <p style="font-size: 16px; margin: 0 0 20px; text-align: center;">
        We’ll check in on your progress in <strong>4-6 weeks</strong>.
      </p>
      <p style="font-size: 14px; color: #e74c3c; text-align: center; font-weight: 600; margin: 20px 0;">
        PLEASE DO NOT REPLY TO THIS EMAIL
      </p>

      <!-- Veteran Details -->
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #2c3e50; font-size: 22px; margin: 0 0 15px; text-align: center;">Veteran Details</h2>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 16px; color: #333333;">
          <li style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Name:</strong> ${vet.name}</li>
          <li style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>From:</strong> ${vet.from}</li>
          <li style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Death:</strong> ${vet.death}</li>
          <li style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Inscribed:</strong> ${vet.inscribed}</li>
          <li style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Squadron:</strong> ${vet.squadron}</li>
          <li style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><strong>Grave:</strong> ${vet.grave}</li>
          <li style="padding: 10px 0;"><strong>Full Description:</strong> ${vet.full_description}</li>
        </ul>
      </div>

      <!-- Support Section -->
      <div style="text-align: center; margin-top: 30px;">
        <h2 style="color: #2c3e50; font-size: 22px; margin: 0 0 15px;">Need Assistance?</h2>
        <p style="font-size: 16px; margin: 0 0 20px;">
          Our team is here to help. Reach out with any questions!
        </p>
        <a href="mailto:researchassistantkim@gmail.com" style="display: inline-block; padding: 12px 30px; background: #3498db; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: 500; transition: background 0.3s;">
          Contact Dr. Kim Bergeron
        </a>
      </div>
    </div>

    <!-- Footer Section -->
    <div style="background: #ecf0f1; padding: 20px; text-align: center; font-size: 14px; color: #7f8c8d;">
      <p style="margin: 0;">Acadia University Recovery Program (AURP)</p>
      <p style="margin: 5px 0 0;"><a href="https://ww2-canadian-mia-aircrew-database.org/" style="color: #3498db; text-decoration: none;">Visit Our Website</a></p>
    </div>
  </div>
</div>
          `;
          break;
      }
     
      console.log("html chosen: ", htmlString)
  
      const info = await transporter.sendMail({
        from: `"WWII Research Guide" <${process.env.USERNAME}>`,
        to: who === "prof" ? process.env.USERNAME : userEmail,
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