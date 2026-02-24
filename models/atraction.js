import mongoose from "mongoose";

export const atractionSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    imgUrl: String,
    category: { type: String, enum: ['air', 'sea', 'land'] },
    subCategory: { 
        type: String, 
        enum: ['horses', 'tractors', 'rangers', 'surfing', 'diving', 'sailing', 'balloon', 'parachute', 'gliding'] 
      },
    phone: String,
    address: String,
    location: {
        lat: Number,
        lng: Number
    }
});

export const atractionModel = mongoose.model('atractions', atractionSchema);