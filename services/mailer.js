import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTempPassword = async (toEmail, tempPassword) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: toEmail,
    subject: "סיסמה זמנית - אטרקציות ישראל",
    html: `
      <div style="font-family: Arial; direction: rtl; padding: 20px;">
        <h2 style="color: #34d399;">🏔️ אטרקציות ישראל</h2>
        <p>קיבלת סיסמה זמנית להתחברות:</p>
        <h1 style="color: #34d399; letter-spacing: 4px;">${tempPassword}</h1>
        <p>לאחר הכניסה תתבקש לשנות את הסיסמה.</p>
      </div>
    `,
  });
};