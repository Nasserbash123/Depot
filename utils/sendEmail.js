import nodemailer from 'nodemailer';

async function sendVerificationEmail(email, verificationToken,verificationCode) {

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
    const verificationURL = `https://depot-project.vercel.app/verify/${verificationToken}`;
    const mailOptions = {
      from: 'nasserbash8@gmail.com',
      to: email,
      subject: 'Account Verification',
      text: `Please click the following link to verify your account: ${verificationURL}
      `,
      html: `<p>Please click the following link to verify your account:</p><a href="${verificationURL}">${verificationURL}
      </a>
        <p>
        and your verification Code is : ${verificationCode}
        </p>
      `,
    };
    await new Promise((resolve, reject) => {
      // send mail
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
  export default sendVerificationEmail