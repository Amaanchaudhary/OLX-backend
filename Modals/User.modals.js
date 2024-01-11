import mongoose, { Schema } from 'mongoose';

const user = new Schema({
    name: {
        type: String    
    },
    email: String,
    number : Number,
    password: String,
    cart: [String],  
})

export default mongoose.model("User", user);