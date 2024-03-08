var nodemailer = require('nodemailer');

async function nodemailer () {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rishuthakur47485@gmail.com',
      pass: 'watn evdg rixq sqde'
    }
  });
  
  var mailOptions = {
    from: 'rishuthakur47485@gmail.com',
    to: 'rajatthakur72188@gmail.com, rajat24apptunix@gmail.com,riya07603@gmail.com',
    subject: 'This is a test Mail by the Server using Node.js',
    text: `It's just a test mail by server!`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

nodemailer();