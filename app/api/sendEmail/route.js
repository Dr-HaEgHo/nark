import nodemailer from "nodemailer"

require('dotenv').config()

export async function POST(req) {
  try {
    const { name, email, message, phone } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailhtml = `<div> 
        <div>
            <strong>Full Name:</strong> <br />
            <span>${name}</span>
        </div>
        <br />
        <div>
            <strong>Email:</strong> <br />
            <span>${email}</span>
        </div>
        <br />
        <div>
            <strong>Phone Number:</strong> <br />
            <span>${phone ? phone : "not included"}</span>
        </div>
        <br />
        <div>
            <strong>Message</strong> <br />
            <span>${message}</span>
        </div>
    </div>`

    const mailOptions = {
      from: email,
      to: "awogbuyitimothy@gmail.com", // the recipient's email address
      // to: 'Narkmarketplace@gmail.com', // the recipient's email address
      subject: `New message from ${name}`,
      html: emailhtml,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error sending email", details: error.message }),
      { status: 500 }
    );
  }
}
