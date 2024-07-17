import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import sendVerificationEmail from "../../../utils/sendEmail";
import { v4 as uuidv4 } from 'uuid';

export default async function  Users(req, res) {
  
  try {
    await dbConnect();

    const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token == null) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
      });
    };
   
    if(req.method === 'GET'){
      authenticateToken(req, res, async () => {
        const userId = req.user.id;
        
        try {
          const user = await User.findOne({ _id: userId });
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
        } else if (req.method === 'POST') {
          const {  name, email, password } = req.body;
          if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
          }
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
          }

          if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
          }
           const verificationToken = uuidv4().replace(/-/g, '');
           const verificationCode = Math.floor(Math.random() * 9000) + 1000;
           const expirationTime = new Date();
           expirationTime.setMinutes(expirationTime.getMinutes() + 10);
           const accessToken = jwt.sign({}, process.env.JWT_SECRET_KEY, { expiresIn: '2w' });
    
           const newUser = new User({
            name,
            email,
            password,
            verificationCode,
            verificationToken,
            verificationTokenExpiration: expirationTime,
            token:accessToken
          });
          
          await sendVerificationEmail(email,verificationToken,verificationCode)
          const savedUser = await newUser.save();
       

res.status(201).json({
  user: savedUser
 
});
          
          
         
        }else{
        res.status(405).json({ message: 'Method Not Allowed' });
      }
  } catch (error) {
    res.status(500).json({ message:error });
  }
}