const MailerLite = require("@mailerlite/mailerlite-nodejs").default;

const mailerlite = new MailerLite({
  api_key: process.env.MAILER_LITE_API_KEY
});

module.exports = mailerlite;