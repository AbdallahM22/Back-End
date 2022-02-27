
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'teamzag6@gmail.com',
        pass: 'teamzag666666'
    }
});

exports.sendMailTo = (dest) => {
    transporter.sendMail({
        from: 'teamzag6@gmail.com',
        to: `${dest}`,
        subject: 'Successful registration',
        text: 'now you can login and use our website'
    }, (err, info)=> {
        if (err) console.log(err)
        else console.log('sent ' + info.response);
    })
}
