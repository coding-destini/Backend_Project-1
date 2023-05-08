const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports

    //The Authentication -> you have to established the identity with which u will be sending that email because
    // if we don't estblished the identity anyone could use gmail to send mail from anyone to anyone
    auth: {
      user: 'akashshahngu@gmail.com', // generated ethereal user
      pass: 'vtuljedjzujglqom', // generated ethereal password
    },

  });

  //Next step we will define we will use ejs and template rendering engine
  let renderTemplate = (data,relativePath)=>{ //relativpath => from where the mail is being send
     let mailHtml;   // here we will store degined page by html
     ejs.renderFile(     //Using ejs to render the template
       path.join(__dirname,'../views/mailers',relativePath), // views/mailer => where i place my html email templates
       data,
       function(error,template){
        if(error){console.log('Error in rendering template',error); return}
        mailHtml = template;
       }
       )
       return mailHtml;
    }

    module.exports = {
        transporter:transporter,
        renderTemplate:renderTemplate
    }