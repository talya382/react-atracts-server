import mongoose from "mongoose";
import { hashSync } from "bcryptjs";
import { userModel } from "./models/user.js";

await mongoose.connect("mongodb+srv://talyaacc055_db:0zYkzSlcWsNGEG7C@atraction.eybywve.mongodb.net/");

const adminEmail = "admin@atracts.com";

// בדוק אם כבר קיים
const existing = await userModel.findOne({ email: adminEmail });
if (existing) {
    console.log("✅ מנהל כבר קיים במערכת");
} else {
    const hashedPassword = hashSync("admin1234", 10);
    await userModel.create({
        userName: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        status: true,
    });
    console.log("✅ משתמש מנהל נוצר בהצלחה!");
    console.log("📧 אימייל: admin@atracts.com");
    console.log("🔑 סיסמה: admin1234");
}

mongoose.disconnect();