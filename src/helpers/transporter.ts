import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: true,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
})

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html
  })
}

export default transporter
