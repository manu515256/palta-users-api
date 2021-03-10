import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    name: { type: String, maxlength:50, required:true},
    email: { type: String, maxlength: 50, required: true},
    rol: { type: Number, default: 2 },
    password:{ type: String, maxlength:9000 ,required:true },
    state:{type: Number, default:1},
    profilepic:{type:String, maxlength:1500, default:"nopic.jpg"},
    createdAt:{type:Date, default:Date.now}
});

const User = mongoose.model('user', userSchema);

export default User;