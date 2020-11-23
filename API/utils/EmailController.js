var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

class EmailController {
    async sendEmail(emailTo, tokenCode) {

        var readHTMLFile = function (path, callback) {
            fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
                if (err) {
                    console.log(err);
                    throw err;

                    callback(err);
                }
                else {
                    callback(null, html);
                }
            });
        };

        var transport = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: 'weknow.facens@gmail.com',
                pass: 'Facens@2020'
            },
            tls: {
                rejectUnauthorized: false
            }
        }));


        readHTMLFile(__dirname + '\\EmailTemplate.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                email: emailTo,
                token: tokenCode
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: 'We Know <weknow.facens@gmail.com>',
                to: emailTo,
                subject: 'Recuperação de Senha',
                html: htmlToSend
            };
            transport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    callback(error);
                }
            });
        });
    }
}
module.exports = new EmailController();