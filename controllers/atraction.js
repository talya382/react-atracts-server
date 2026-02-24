import { atractionModel } from "../models/atraction.js";
import jwt from 'jsonwebtoken';

export const getAtraction = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        // פילטר לפי category ו-subCategory אם נשלחו
        const filter = {};
        if (req.query.category) filter.category = req.query.category;
        if (req.query.subCategory) filter.subCategory = req.query.subCategory;

        const atraction = await atractionModel.find(filter).skip(skip).limit(limit);
        const totalAtraction = await atractionModel.countDocuments(filter);

        return res.status(200).json({
            status: "success",
            results: atraction.length,
            total: totalAtraction,
            currentPage: page,
            data: atraction
        });
    } catch (err) {
        return res.status(500).json({ title: "Error retrieving atraction", message: err.message });
    }
}
export const getAtractiontById = async (req, res) => {
    try {
        const { id } = req.params;
        let atraction = await atractionModel.findById(id);
        if (!atraction)
            return res.status(404).json({ title: "no such atraction", message: "atraction not found" })
        return res.status(200).json(atraction)
    } catch (err) {
        return res.status(500).json({ title: "Error retrieving atraction", message: err })
    }
}

export const verifyToken = (req, res, next) => {
    // 1. חילוץ הטוקן מה-Header (הסטנדרט הוא שדה שנקרא authorization)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // מוציא את הטוקן מתוך "Bearer <token>"

    if (!token) {
        return res.status(401).json({ title: "Unauthorized", message: "Please log in to the system." });
    }

    try {
        // 2. אימות הטוקן (את צריכה לדעת מה המפתח הסודי שהשתמשו בו בישות של ה-User)
        // בדרך כלל הוא שמור ב-process.env.JWT_SECRET
        // eslint-disable-next-line no-undef
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');

        // 3. שמירת פרטי המשתמש על הבקשה
        // כאן עובר המידע (כמו ה-role) שה-isAdmin שלך מחפש
        req.user = decoded; 

        next(); // עובר למחסום הבא (isAdmin)
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
        return res.status(403).json({ title: "Forbidden", message: "טוקן לא תקף או פג תוקף" });
    }
};

export const isAdmin = (req, res, next) => {
    const user = req.user;

    if (user && user.role === 'Admin') {
        // אם הוא מנהל, המשך לפונקציה הבאה (createAtraction)
        next();
    } else {
        // אם הוא לא מנהל, חסום אותו
        return res.status(403).json({ title: "Access Denied", message: "Only admins are allowed to perform this action" });
    }
}

export const createAtraction = async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).json({ title: "missing body", message: "no data" })
        let { name, description, price, imgUrl } = req.body;
        if (!name || !description || !price || !imgUrl)
            return res.status(400).json({ title: "missing data", message: "name, description, price, imgUrl are required" })
        if (price <= 0)
            return res.status(400).json({ title: "invalid data", message: "price must be greater than 0" })
        let already = await atractionModel.findOne({ name: name })
        if (already)
            return res.status(409).json({ title: "duplicate atraction", message: "a atraction with the same name already exists" })
        const newAtraction = new atractionModel({ name, description, price, imgUrl })
        let atraction = await newAtraction.save()
        return res.status(201).json(atraction)
    } catch (err) {
        return res.status(500).json({ title: "Error creating atraction", message: err.message })
    }
}

export const deleteAtraction = async (req, res) => {
    try {
        const id = req.params.id

        let remove = await atractionModel.findByIdAndDelete(id);
        if (!remove)
            return res.status(404).json({ title: "error deleting", message: "atraction not found" })
        return res.status(200).json(remove);
    } catch (err) {
        return res.status(500).json({ title: "Error deleting atraction", message: err.message })
    }
}

export const updateAtraction = async (req, res) => {
    try {
        const id = req.params.id
        let { name, description, price, imgUrl } = req.body;

        let updateObject = {}
        if (name !== undefined) updateObject.name = name;
        if (description !== undefined) updateObject.description = description;
        if (price !== undefined) {
            if (price <= 0)
                return res.status(400).json({ title: "invalid data", message: "price must be greater than 0" })
            updateObject.price = price
        }
        if (imgUrl !== undefined) updateObject.imgUrl = imgUrl;

        let atraction = await atractionModel.findByIdAndUpdate(id, updateObject, { new: true })//ניו טרו אומר שיחזיר את הואיביקט לאחר העדכון ולא לפני

        if (!atraction)
            return res.status(404).json({ title: "error updating", message: "atraction not found" })
        return res.status(200).json(atraction);
    } catch (err) {
        return res.status(500).json({ title: "Error updating atraction", message: err.message })
    }
}


