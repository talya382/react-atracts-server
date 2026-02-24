import { userModel } from "../models/user.js";
import { hash, compare, hashSync, compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = (req, res) => {
    userModel.find({ status: true }, { password: 0 })
        .then(users => { return res.json(users) })
        .catch(err => {
            return res.status(500).json({ title: "eror retrieving users", massage: err })
        })
}

export const addUser = (req, res) => {
    if (!req.body)
        return res.status(400).json({ title: "missing body", massage: "no data" })
    let { userName, password, email, profileImgUrl } = req.body
    if (!userName || !password || !email)
        return res.status(400).json({ title: "missing data", massage: "userName,password,email are required" })
    //כאן המקום לבדוק שהסיסמא במבנה תקין וגם המייל 
    userModel.findOne({ email }).then(already => {
        if (already)
            return res.status(409).json({ title: "duplicate user", massage: "a user with the sane email already exist" })
        let hashedPassword = hashSync(password, process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10)
        console.log(hashedPassword);
        const newUser = new userModel({ userName, password: hashedPassword, email, profileImgUrl })
        newUser.save()
            .then(user => {
                let { password, ...other } = user.toObject();
                return res.status(201).json(other)
            })
            .catch(err => {
                return res.status(500).json({ title: "error creating usre", massage: "err" })
            })
    })
        .catch(err => {
            return res.status(500).json({ title: "Error creating user", massage: err })
        })
}

export const login = (req, res) => {
    console.log("--- הגיעה בקשת לוגין! ---");
    console.log("Login request reached server with:", req.body.email); // הדפסה 1

    if (!req.body)
        return res.status(400).json({ title: "missing body", massage: "no data" });

    let { email, password: pass } = req.body;

    userModel.findOne({ email, status: true })
        .then(user => {
            console.log("User found in DB:", user ? "Yes" : "No"); // הדפסה 2

            if (!user)
                return res.status(404).json({ title: "invalid details", massage: "email is incorrect" });

            let isMatch = compareSync(pass, user.password);
            console.log("Password match:", isMatch); // הדפסה 3

            if (!isMatch)
                return res.status(404).json({ title: "invalid details", massage: "password is incorrect" });

            console.log("Generating token..."); // הדפסה 4

            const token = jwt.sign(
                { _id: user._id, role: user.role },
                process.env.SECRET,
                { expiresIn: "1h" }
            );

            console.log("Token generated successfully!"); // הדפסה 5

            let { password, ...other } = user.toObject();
            return res.json({ token, user: other });
        })
        .catch(err => {
            console.error("Login Error:", err); // הדפסה במקרה של שגיאה
            return res.status(500).json({ title: "eror logging in", massage: err.message });
        });
}