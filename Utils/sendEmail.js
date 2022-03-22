import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transport.sendMail(message);
};
