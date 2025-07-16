// backend/token.js
const { AccessToken } = require('twilio');
const { ChatGrant } = AccessToken;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKeySid = process.env.TWILIO_API_KEY_SID;
const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;
const serviceSid = process.env.TWILIO_CONVERSATIONS_SERVICE_SID;

function generateToken(identity: any) {
  const token = new AccessToken(accountSid, apiKeySid, apiKeySecret, {
    identity,
  });

  const chatGrant = new ChatGrant({ serviceSid });
  token.addGrant(chatGrant);

  return token.toJwt();
}
