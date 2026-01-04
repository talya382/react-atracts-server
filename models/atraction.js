import mongoose from "mongoose";

export const atractionSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    imgUrl:String,
});

export const atractionModel=mongoose.model('atractions',atractionSchema);