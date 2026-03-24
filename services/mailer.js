import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

export const sendTempPassword = async (toEmail, tempPassword) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: toEmail,
    subject: "סיסמה זמנית - אטרקציות ישראל",
    html: `
      <div style="font-family: Arial; direction: rtl; padding: 20px;">
        <h2 style="color: #34d399;">🏔️ אטרקציות ישראל</h2>
        <p>קיבלת סיסמה זמנית:</p>
        <h1 style="color: #34d399; letter-spacing: 4px;">${tempPassword}</h1>
        <p>לאחר הכניסה תתבקש לשנות את הסיסמה.</p>
      </div>
    `,
  });
};