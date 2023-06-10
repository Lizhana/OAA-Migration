const mailchimp = require("@mailchimp/mailchimp_marketing");
require("dotenv").config();
const { SERVER, API_KEY } = process.env;

mailchimp.setConfig({
  apiKey: API_KEY,
  server: SERVER,
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();

module.exports = mailchimp;
