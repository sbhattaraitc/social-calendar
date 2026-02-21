#!/usr/bin/env node
// send_gmail.js
// Usage: set env vars CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, FROM_EMAIL, TO_EMAIL

const { google } = require('googleapis');
const nodemailer = require('nodemailer');

async function main(){
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
  const FROM_EMAIL = process.env.FROM_EMAIL || process.env.USER_EMAIL;
  const TO_EMAIL = process.env.TO_EMAIL || FROM_EMAIL;
  const REDIRECT_URI = process.env.REDIRECT_URI || 'urn:ietf:wg:oauth:2.0:oob';

  if(!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !FROM_EMAIL){
    console.error('Missing required env vars. Please set CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, FROM_EMAIL.');
    process.exit(2);
  }

  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try{
    const accessTokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;
    if(!accessToken) throw new Error('Failed to obtain access token');

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: FROM_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: 'Test message from Social Calendar (one-time)',
      text: 'This is a one-time test sent via the Gmail API using OAuth2 refresh token.'
    };

    const result = await transport.sendMail(mailOptions);
    console.log('Email sent:', result.messageId);
  }catch(err){
    console.error('Send failed:', err.message || err);
    process.exit(1);
  }
}

main();
