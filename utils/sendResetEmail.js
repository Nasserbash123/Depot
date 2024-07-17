import nodemailer from 'nodemailer';

async function sendResetEmail(email, resetToken) {

    const transporter = nodemailer.createTransport({
  
      service: 'Gmail',
      auth: {
        user: 'nasserbash8@gmail.com',
        pass: process.env.PASSWORD,
      },
    });
   
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
          if (error) {
              console.log(error);
              reject(error);
          } else {
              console.log("Server is ready to take our messages");
              resolve(success);
          }
      });
    });
    
    const ResetPasswordURL = `https://depot-project.vercel.app/reset-password/${resetToken}`;

    const mailOptions = {
      from: 'nasserbash8@gmail.com',
      to: email,
      subject: ' Reset Password',
      text: `Please click the following link to Reset your Password: ${ResetPasswordURL}
     
      `,
      html: `<p>Please click the following link to Reset your Password:</p><a href="${ResetPasswordURL}">${ResetPasswordURL}
      </a>
      `,
    };
  

    await new Promise((resolve, reject) => {
   
      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.error(err);
              reject(err);
          } else {
              console.log(info);
              resolve(info);
          }
      });
  });
   
  }
  export default sendResetEmail