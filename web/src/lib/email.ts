import nodemailer from "nodemailer";

export async function sendMagicLinkEmail(identifier: string, url: string) {
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: { user: account.user, pass: account.pass },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || "login@sentient.local",
    to: identifier,
    subject: "Your Sentient Market sign-in link",
    text: url,
    html: `<p>Click to sign in:</p><p><a href="${url}">${url}</a></p>`,
  });


  return nodemailer.getTestMessageUrl(info);
}
