import mailer from 'nodemailer'

function setupMailer() {
  return mailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

function sendEmail(mailOptions) {
  let mail = setupMailer()
  mail.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error)

      return
    }

    console.log('email has been sent: ' + info.response)
  });
}

export default function main (status) {
  let mailOptions = {
    from: process.env.EMAIL_USER_ACCOUNT,
    to: process.env.EMAIL_USER_ACCOUNT_RECEIVER,
    subject: 'BL Status Update',
    text: `Good news!!! The status of the Business License has been updated to: ${status}`,
  }

  sendEmail(mailOptions);
}
