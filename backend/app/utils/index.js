// const Datauri = require('datauri');
// const path = require('path');

// const cloudinary = require('../config/cloudinary');
// // const sgMail = require('@sendgrid/mail');

// // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// function uploader(req) {
//     return new Promise((resolve, reject) => {
//         const dUri = new Datauri();
//         let image = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

//         cloudinary.uploader.upload(image.content, (err, url) => {
//             if (err) return reject(err);
//             return resolve(url);
//         })
//     });
// }

// // const { Email } = require('./smtp.js')
// function sendEmail(to, from, subject, html) {
//     return new Promise((resolve, reject) => {
//         sgMail.send(mailOptions, (error, result) => {
//             if (error) return reject(error);
//             return resolve(result);
//         });
//     });

//     // return Email.send({
//     //     Host: "smtp.gmail.com",
//     //     Username : "noti.vnpt@gmail.com",
//     //     Password : "Vnpt@123",
//     //     To : to,
//     //     From : from,
//     //     Subject : subject,
//     //     Body : html,
//     // });
// }

// module.exports = { uploader, sendEmail };

