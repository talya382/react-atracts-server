// ייבוא מודל ההזמנות ממונגוס
import { OrderModel } from "../models/orsers.js";

// שליפת כל ההזמנות מהמסד
export async function GetAllOrders(req, res) {
    try {
        let result = await OrderModel.find()

        return res.json(result)
    } catch (x) {
        return res.status(500).json({ title: "Error retrieving orders", message: x.message })
       
    }
}

// הוספת הזמנה חדשה
export const addOrder = async (req, res) => {

    // חילוץ שדות מה־body
    const {
        id,
        targetDate,
        address,
        customerCode,
        products,
    } = req.body;

    // בדיקה שכל שדות החובה קיימים
    if (!id || !targetDate || !address || !customerCode || !products) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // בדיקה שהמוצרים הם מערך ולא ריק
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
            message: "Products must be a non-empty array"
        });
    }

    // בדיקת תקינות לכל מוצר
    for (let p of products) {
        if (!p.productId || p.quantity <= 0) {
            return res.status(400).json({
                message: "נתוני מוצר לא תקינים"
            });
        }
    }

    try {
        // יצירת הזמנה חדשה
        const newOrder = new OrderModel({
            id,
            targetDate,
            address,
            customerCode,
            products
        });

        // שמירת ההזמנה במסד
        await newOrder.save();

        // החזרת ההזמנה שנוצרה
        res.status(201).json(newOrder);

    }   catch (x) {
        return res.status(500).json({ title: "Error adding order", message: x })
    }
};

// שליפת הזמנה לפי ID (רק אם שייכת למשתמש)
export const getOrderById = async (req, res) => {
    try {
        // מזהה ההזמנה מה־URL
        const { id } = req.params;

        // מזהה המשתמש מה־body
        const { userId } = req.body;

        // בדיקה ש־userId נשלח
        if (!userId) {
            return res.status(400).json({
                title: "Bad Request",
                message: "userId is required"
            });
        }

        // חיפוש הזמנה לפי ID ומשתמש
        const order = await OrderModel.findOne({ 
            _id: id, 
            userId 
        });

        // אם ההזמנה לא נמצאה
        if (!order) {
            return res.status(404).json({
                title: "Order not found",
                message: "No such order for this user"
            });
        }

        // החזרת ההזמנה
        res.json(order);

    } catch (x) {
        return res.status(500).json({ title: "Error retrieving order", message: x })
    }
};

// עדכון הזמנה – סימון כיצאה למשלוח
export const updateOrder = async (req, res) => {
    try {
        // מזהה ההזמנה
        const { id } = req.params;

        // חיפוש ההזמנה
        const order = await OrderModel.findById(id);

        // אם לא נמצאה הזמנה
        if (!order) {
            return res.status(404).json({
                title: "Order not found",
                message: "No such order"
            });
        }

        // סימון ההזמנה כמשולחת
        order.isShipped = true;

        // שמירת העדכון
        await order.save();

        // החזרת תוצאה
        return res.json({
            message: "Order marked as shipped",
            order
        });

    }     catch (x) {
        return res.status(500).json({ title: "Error updating order status", message: x })
    }
};

// מחיקת הזמנה לפי ID (רק אם שייכת למשתמש)
export const deleteOrder = async (req, res) => {
    try {
        // מזהה ההזמנה
        const { id } = req.params;

        // מזהה המשתמש
        const { userId } = req.body;

        // בדיקה ש־userId נשלח
        if (!userId) {
            return res.status(400).json({
                title: "Bad Request",
                message: "userId is required"
            });
        }

        // מחיקת ההזמנה רק אם שייכת למשתמש
        const deletedOrder = await OrderModel.findOneAndDelete({
            _id: id,
            userId
        });

        // אם לא נמצאה הזמנה למחיקה
        if (!deletedOrder) {
            return res.status(404).json({
                title: "Order not found",
                message: "No such order for this user"
            });
        }

        // החזרת הודעת הצלחה
        return res.json({
            title: "Order deleted",
            message: `Order ${id} was successfully deleted`
        });

    } catch (x) {
        return res.status(500).json({ title: "Error cancelling order", message: x })
    }
};
