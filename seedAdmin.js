import mongoose from "mongoose";
import { hashSync } from "bcryptjs";
import { userModel } from "./models/user.js";

// הכתובת המדויקת של ה-Database שלך
const MONGO_URI = "mongodb+srv://inbarycohen_db_user:6mpSGxaQigDCxtuG@inbardb.yejxkbj.mongodb.net/attractiondb";

async function createAdmin() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ מחובר ל-attractiondb");

        const adminEmail = "admin@atracts.com";

        const existing = await userModel.findOne({ email: adminEmail });
        if (existing) {
            console.log("✅ מנהל כבר קיים במערכת");
        } else {
            const hashedPassword = hashSync("admin1234", 10);
            await userModel.create({
                userName: "Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "ADMIN", // ודאי שבמודל שלך זה role ולא isAdmin
                status: true,
            });
            console.log("✅ משתמש מנהל נוצר בהצלחה!");
        }
    } catch (err) {
        console.error("❌ שגיאה:", err);
    } finally {
        mongoose.disconnect();
    }
}

createAdmin();