import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";


export default async function  Verification(req, res) {
  
  try {
    await dbConnect();
    if (req.method === 'POST') {
      const { verificationCode } = req.body;
      const verificationToken = req.headers['verification-token'];
      if (!verificationToken || !verificationCode) {
        return res.status(400).json({ error: 'Verification token and code are required' });
      }
  
      try {
        const user = await User.findOne({ verificationToken, verificationCode });
  
       
        if (!user) {
          return res.status(400).json({ error: 'Incorrect verification token or code' });
        }
        
        if (user.verificationTokenExpiration < new Date()) {
          return res.status(400).json({ error: 'Verification token or code has expired' });
        }

    user.active = true;
    await user.save();

    return res.status(200).json({ message: 'Account verified successfully' })
      } catch (error) {
        return res.status(500).json({ error: 'Failed to verify account' });
      }
    }else{
        res.status(405).json({ message: 'Method Not Allowed' });
      }
  } catch (error) {
    res.status(500).json({ message:error });
  }
}