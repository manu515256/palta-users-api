import mongoose, { Schema } from 'mongoose';


const childSchema = new Schema({
    parentId: { type: Schema.Types.ObjectId, ref: 'user' , required:true},
    name: { type: String, maxlength: 50, required: true },
    email: { type: String, maxlength: 50, required: true, unique:true },
    rol: { type: Number, default: 3 },
    password: { type: String, maxlength: 9000, required: true },
    state: { type: Number, default: 1 },
    profilepic: { type: String, maxlength: 1500, default: "nopic.jpg" },
    createdAt: { type: Date, default: Date.now }
});

const Child = mongoose.model('child', childSchema);

export default Child;