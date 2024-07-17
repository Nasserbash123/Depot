import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  token:{
      type:String 
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    verificationCode:{
      type: String,
    },
    verificationToken:{
      type: String,
    },
    verificationTokenExpiration:{
      type: Date,
    },
    resetToken:{
      type: String,
    }
   
    
});

const User = mongoose.models.User || mongoose.model('User',userSchema);

export default User;