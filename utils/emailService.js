const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendWelcomeEmail = async (toEmail, userName, companyName) => {
  if (!process.env.EMAIL_USER) return; // Skip if credentials not set in .env
  
  const mailOptions = {
    from: `"SaaS Platform" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Welcome to ${companyName}!`,
    html: `<h3>Hello ${userName},</h3>
           <p>Aapka account successfully setup ho gaya hai <strong>${companyName}</strong> ke workspace mein.</p>
           <p>Aap portal mein credentials ke sath login kar sakte hain.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Email send error:', err.message);
  }
};

module.exports = { sendWelcomeEmail };