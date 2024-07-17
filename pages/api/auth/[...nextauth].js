import dbConnect from "@/utils/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/User";
import sendVerificationEmail from "@/utils/sendEmail";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await dbConnect();

          if (!validator.isEmail(email)) {
            throw new Error("Invalid email format");
          }
          const user = await User.findOne({ email, password });

          if (!user) {
            throw new Error("Email or password is invalid");
          } else if (!user.active) {
            const verificationToken = uuidv4().replace(/-/g, "");
            const verificationCode = Math.floor(Math.random() * 9000) + 1000;
            const expirationTime = new Date();
            expirationTime.setMinutes(expirationTime.getMinutes() + 10);
            user.verificationToken = verificationToken;
            user.verificationCode = verificationCode;
            user.verificationTokenExpiration = expirationTime;

            await user.save();
            sendVerificationEmail(email, verificationToken, verificationCode);
            throw new Error(
              "Your account is not active. Please check your email for the verification code."
            );
          } else {
          
            const session = {
              name: user.name,
              email: user.email,
              token: user.token
             
            };

            return session;
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
    
      if (user) {
        try {
        
    
          token.accessToken = user.token;
       
        } catch (error) {
          console.error('Error retrieving userCart:', error);
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.accessToken = token.accessToken;
       
      }
      return session;
    },
  },
  pages: {
    signIn: "/user-dashboard",
  },
});
