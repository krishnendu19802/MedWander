const { google } = require('googleapis');
require('dotenv').config()
let token = {
    'access_token': process.env.access_token,
    'refresh_token': process.env.refresh_token,
    'scope': process.env.scope,
    'token_type': process.env.token_type,
    'expiry_date': process.env.expiry_date,
}
let timestamp=0
const client_secret = process.env.client_secret
const client_id = process.env.client_id
// const redirect_uris =process.env.redirect_uris
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, "http://localhost:3000");
// console.log(oAuth2Client)
// Set up Google Sheets API
const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
// Generate an authorization URL
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // This will ensure you get a refresh token
    scope: ['https://www.googleapis.com/auth/spreadsheets'] // Scope for Google Sheets API
});
oAuth2Client.setCredentials(token)

// Exchange authorization code for access token and refresh token
const getAccessToken = async (code) => {
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        console.log('tokens:', tokens)
        console.log('Access token:', tokens.access_token);
        console.log('Refresh token:', tokens.refresh_token);
        return tokens;
    } catch (error) {
        console.error('Error retrieving access token:', error);
        throw error;
    }
};
// token=getAccessToken(process.env.code)
// console.log(token)
// oAuth2Client.setCredentials(token);
const writeToSheet =  (data) => {
    console.log(data)
    if (data === undefined)
        return 
    const spreadsheetId = process.env.spreadsheetId; // Replace with your actual spreadsheet ID
    const range = 'Sheet1!A1:D'; // Replace with your sheet name and range as needed
    const values = data.map((dt)=>{
        delete dt.TSTAMP
        return Object.values(dt)
    });
    // console.log(values)
    
    try {
        sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: 'RAW',
            resource: {
                values
            }
        }).then((result) => {
            // console.log(result)
            return result
        }).catch((error) => {
            console.log(error)
        });

        
    } catch (error) {
        console.error('Error writing data:', error);
        throw error;
    }

}

module.exports=writeToSheet