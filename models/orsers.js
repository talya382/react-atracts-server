import mongoose from "mongoose";

// סכימה מינימלית למוצר בהזמנה
const MinimalProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true // חובה מזהה מוצר
  },
  quantity: {
    type: Number,
    required: true,
    min: 1 // כמות מינימלית
  }
});

// סכימת ההזמנה
const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true // מזהה הזמנה ייחודי
  },
  orderDate: {
    type: Date,
    default: Date.now // תאריך יצירה אוטומטי
  },
  targetDate: {
    type: Date,
    required: true // תאריך יעד
  },
  address: {
    type: String,
    required: true // כתובת משלוח
  },
  customerCode: {
    type: String,
    required: true // קוד לקוח
  },
  products: {
    type: [MinimalProductSchema],
    required: true // רשימת מוצרים
  },
  isShipped: {
    type: Boolean,
    default: false // האם נשלחה
  }
});

// יצירת מודל להזמנות
export const OrderModel = mongoose.model("orders", orderSchema);
