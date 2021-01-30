const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const templatePaths = {
    NEW_USER: 'NEW_USER',
    NEW_AGENT: 'NEW_AGENT',
    RESET_PASSWORD: 'RESET_PASSWORD'
}

if (process.env.NODE_ENV === "development") {
    dotenv.config({
        path: "./config/config-local.env",
    });
} else {
    dotenv.config({
        path: "./config/config.env",
    });
}

function getTemplate(params) {
    if (params.template === templatePaths.NEW_USER) {
        return `<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
            <tbody>
                <tr style="border-collapse:collapse"> 
                <td align="left" style="padding:0;Margin:0;padding-bottom:20px"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#6AA38B">Please click on this <a href="${params.link}">link</a> to activate your account</h2>
                <h3>Default Password: ${params.password}</h3>
                </td> 
                </tr> 
            </tbody>
            </table>`
    } else if (params.template === templatePaths.RESET_PASSWORD) {
        return `<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
            <tbody>
                <tr style="border-collapse:collapse"> 
                <td align="left" style="padding:0;Margin:0;padding-bottom:20px"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#6AA38B">YOUR PASSWORD HAS BEEN CHANGED</h2></td> 
                </tr> 
                <tr style="border-collapse:collapse"> 
                <td align="left" style="padding:0;Margin:0;padding-bottom:20px"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#6AA38B">PASSWORD: ${params.password}</h2></td> 
                </tr> 
            </tbody>
            </table>`
    } else if (params.template === templatePaths.NEW_AGENT) {
        return `<table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
            <tbody>
                <tr style="border-collapse:collapse"> 
                <td align="left" style="padding:0;Margin:0;padding-bottom:20px"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#6AA38B">YOUR AGENT ACCOUNT PASSWORD</h2></td> 
                </tr> 
                <tr style="border-collapse:collapse"> 
                <td align="left" style="padding:0;Margin:0;padding-bottom:20px"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#6AA38B">PASSWORD: ${params.password}</h2></td> 
                </tr> 
            </tbody>
            </table>`
    }
}

const smtpTransporter = nodemailer.createTransport({
    port: 465,
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    }
});


function sendEmail(to, subject, body, callback, attachments = []) {
    // send mail
    smtpTransporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: to,
        subject: subject,
        html: body.template ? getTemplate(body) : body,
        attachments: attachments
    }, callback);
}

module.exports = {
    transporter: smtpTransporter,
    templates: templatePaths,
    sendEmail: sendEmail
}