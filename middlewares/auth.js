import jwt from "jsonwebtoken"

export function authMiddleware(req, res, next) {

    let token = req.headers.authorization
    if (!token)
        return res.status(401).json({ title: "unauthorized", message: "first log in" })
    try {


        let data = jwt.verify(token, process.env.SECRET)
        req.userId = data.userId
        next()
        
    }
    catch (err) {
        return res.status(401).json({ title: "unauthorized", message: err.message })
    }
}

export function authManagerMiddleware(req, res, next) {

    let token = req.headers.authorization
    if (!token)
        return res.status(401).json({ title: "unauthorized", message: "first log in" })
    try {


        let data = jwt.verify(token, process.env.SECRET)//הוא בודק שהטוקן תקין ובתוקף
        req.userId = data.userId
        if (data.role != "ADMIN")
            return res.status(403).json({ title: "forbidden", message: "you are not allowed" })
        next()
    }        
    catch (err) {
        return res.status(401).json({ title: "unauthorized", message: err.message })
    }
}
  