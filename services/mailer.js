import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendTempPassword = async (toEmail, tempPassword) => {
  await transporter.sendMail({
    from: `"אטרקציות ישראל" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: "סיסמה זמנית - אטרקציות ישראל",
    html: `
      <div style="font-family: Arial; direction: rtl; padding: 20px; background: #04140e; color: white; border-radius: 10px;">
        <h2 style="color: #34d399;">🏔️ אטרקציות ישראל</h2>
        <p>קיבלת סיסמה זמנית להתחברות:</p>
        <h1 style="color: #34d399; letter-spacing: 4px;">${tempPassword}</h1>
        <p>הסיסמה תקפה ל-15 דקות בלבד.</p>
        <p>לאחר הכניסה תתבקש לשנות את הסיסמה.</p>
      </div>
    `,
  });
};