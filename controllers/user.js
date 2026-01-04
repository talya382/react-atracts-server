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
    if (!req.body)
        return res.status(400).json({ title: "missing body", massage: "no data" })
    let { email, password: pass } = req.body
    if (!email || !pass)
        return res.status(404).json({ title: "missing data", massage: "email,password are required" })
    userModel.findOne({ email, status: true })
        .then(user => {
            if (!user)
                return res.status(404).json({ title: "invalid details", massage: "email is incorrect" })
            let isMatch = compareSync(pass, user.password)//משווה את הסיסמא עם הסיסמא המצויה במסד הנתונים
            if (!isMatch)
                return res.status(404).json({ title: "invalid details", massage: "password is incorrect" })

            const token = jwt.sign(
                { _id: user._id, role: user.role },//חהשרת חותם מי המשתמש ואיזה רול הוא
                process.env.JWT_SECRET,//מחרוזת סודית שרק הוא יודע
                { expiresIn: "1h" }//הטוקן תקף לשעה
            );
             let { password, ...other } = user.toObject();
    
            return res.json({//הלקוח שומר את הטוקן
                token,
                user: other
            });
        })
        .catch(err => {
            return res.status(500).json({ title: "eror logging in", massage: err })
        })
}
