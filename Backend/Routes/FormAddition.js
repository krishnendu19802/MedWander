const express = require('express')
const Router = express.Router()
const { google } = require('googleapis');
require('dotenv').config()
let token = {
    'access_token': process.env.access_token,
    'refresh_token': process.env.refresh_token,
    'scope': process.env.scope,
    'token_type': process.env.token_type,
    'expiry_date': process.env.expiry_date,
}
const client_secret = process.env.client_secret
const client_id = process.env.client_id
// const redirect_uris =process.env.redirect_uris
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, "http://localhost:3000");
console.log(oAuth2Client)
// Set up Google Sheets API
const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
// Generate an authorization URL
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // This will ensure you get a refresh token
    scope: ['https://www.googleapis.com/auth/spreadsheets'] // Scope for Google Sheets API
});
oAuth2Client.setCredentials(token)

console.log('Authorize this app by visiting this URL:', authUrl);

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

const postfunction = (conn) => {
    const writeToSheet = async (data) => {
        console.log(data)
        if (data === undefined)
            return 'hoi'
        const spreadsheetId = '1ZuEYgF67Uc_ylBfWKrSKrUlVMWgNxY7ofDR96fbXvxw'; // Replace with your actual spreadsheet ID
        const range = 'Sheet1!A1:D'; // Replace with your sheet name and range as needed

        try {
            const response = await sheets.spreadsheets.values.update({
                spreadsheetId: spreadsheetId,
                range: range,
                valueInputOption: 'RAW',
                resource: {
                    values: [
                        [data.form_type, data.name, data.country_code, data.phone_number]
                    ]
                }
            }).then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log(error)
            });

            console.log('Data written successfully:', response);
            return response;
        } catch (error) {
            console.error('Error writing data:', error);
            throw error;
        }

    }
    Router.post('/', async (req, res) => {
        const { form_type, name, country_code, phone_number } = req.body

        console.log(form_type)
        const sql = `INSERT INTO SUBMISSIONS VALUES (?,?,?,?)`
        conn.query(sql, [form_type, name, country_code, phone_number], (error, result) => {
            if (error)
                res.status(401).send(error)
            else
                res.status(200).send({ 'Message': 'Form saved' })
        })
    })

    Router.post('/allresults', (req, res) => {
        const { form_type, name, country_code, phone_number } = req.body
        console.log(form_type)
        const val = writeToSheet({
            form_type,
            name,
            country_code,
            phone_number
        })
        res.send(val)
    })
    return Router
}

module.exports = postfunction

