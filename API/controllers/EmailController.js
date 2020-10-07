var smtpTransport = require('nodemailer-smtp-transport');
var nodemailer = require("nodemailer");

class EmailController{
    async sendEmail(emailTo, token) {
        var transport = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: 'weknow.facens@gmail.com',
                pass: 'Facens@2020'
            },
            tls: {
                rejectUnauthorized: false
            }
        }));
        
        transport.sendMail({
            from: 'We Know <weknow.facens@gmail.com>',
            to: emailTo,
            subject: 'Recuperação de Senha',
            text: 'Teste'
        }).then(message => {
            console.log(message);
        }).catch(err => {
            console.log(err);
        })
    }    
}
module.exports = new EmailController();
