import jwt from "jsonwebtoken"
export function generateToken(userName,role,_id){
    let token =jwt.sign({userName,role,_id},process.env.SECRET,{expiresIn:'3m'})
    return token;

}