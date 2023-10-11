import nodemailer from "nodemailer";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function sendEmail(email, emailType, userID) {
  try {
    const hashedToken = await bcrypt.hash(userID.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        VerifyToken: hashedToken,
        VerifyTokenExpiry: Date.now() + 3600000,
      });
      
    } else if ("RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL,
            pass:process.env.PASSWORD
        }
    });

    const mailOptions = {
        from:process.env.MAIL,
        to:email,
        subject:emailType==='VERIFY'?'verify your Email address':"Resest your password",
        html:`<p>Click <a href="${process.env.DOMAIN}/verifyToken?token=${hashedToken}">Here</a> to ${emailType==='VERIFY'?"verify your email":"reset your password"}</p>`
    }
    const mailRes = await transporter.sendMail(mailOptions)
    console.log('email sent success')
    return mailRes
  } catch (error) {
    throw new Error(error);
  }
}
