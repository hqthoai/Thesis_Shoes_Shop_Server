const nodemailer = require("nodemailer");
require('dotenv').config();
const generator = require('generate-password');
const UserController = require("./UserController");
const EmailController = {
    sendRecoverPassEmail: async (req, res) => {
        try {
            const {email} = req.body;
            console.log(email);
            if (email) {
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                      user: process.env.EMAIL_USER,
                      pass: process.env.EMAIL_PASSWORD,
                    },
                });
                const resetPassword = generator.generate({
                    length: 8,
                    numbers: true
                });

                const info = await transporter.sendMail({
                    from: `"GIMME SHOES 👻" <${process.env.EMAIL_USER}>`, // sender address
                    to: email, // list of receivers
                    subject: "Recover Password", // Subject line
                    text: 'Your password have been reset!', // plain text body
                    html: `<p>Your password is: <b>${resetPassword}</b></p>`, // html body  
                });

                if (info) {
                    await UserController.recoverPassword(email, resetPassword);
                    return res.status(200).json(info);
                }
            }
            return res.status(500).json('Có lỗi rồi !');
        } catch (error) {
            console.log(error);
        }
    }
   
}


module.exports = EmailController;