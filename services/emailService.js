const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOrderConfirmation = async (customerEmail, orderDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: `Order Confirmation #${orderDetails._id.toString().slice(-6)}`,
    html: `<h2>Order Placed Successfully!</h2><p>Amount: $${orderDetails.totalAmount}</p>`
  };
  return transporter.sendMail(mailOptions);
};