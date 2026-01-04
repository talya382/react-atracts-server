import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    userName:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    //createdAt:{type:Date,default:Date.now},
    role:{type:String,enum:['USER','ADMIN'],default:'USER'},
    status:{type:Boolean,default:true},
    profileImgUrl:{type:String,default:''},

},{ timestamps: true})
export const userModel=mongoose.model('users',userSchema);