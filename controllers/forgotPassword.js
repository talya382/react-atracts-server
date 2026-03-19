import { userModel } from "../models/user.js";
import { sendTempPassword } from "../services/mailer.js";
import { hashSync } from "bcryptjs";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "נא להזין אימייל" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "המייל לא נמצא במערכת" });

    // יצירת סיסמה זמנית
    const tempPassword = Math.random().toString(36).slice(-8);

    // שמירת הסיסמה הזמנית במסד
    user.password = hashSync(tempPassword, 10);
    user.mustChangePassword = true;
    await user.save();

    // שליחת המייל
    await sendTempPassword(email, tempPassword);

    return res.json({ message: "סיסמה זמנית נשלחה למייל שלך" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.status(400).json({ message: "חסרים שדות" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "משתמש לא נמצא" });

    user.password = hashSync(newPassword, 10);
    user.mustChangePassword = false;
    await user.save();

    return res.json({ message: "הסיסמה עודכנה בהצלחה" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};