const express = require('express')
const Router = express.Router()

require('dotenv').config()

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
        const sql = `INSERT INTO SUBMISSIONS(FORM_TYPE,NAME,COUNTRY_CODE,PHONE_NUMBER) VALUES (?,?,?,?)`
        conn.query(sql, [form_type, name, country_code, phone_number], (error, result) => {
            if (error)
                res.status(401).send(error)
            else
                res.status(200).send({ 'Message': 'Form saved' })
        })
    })

  
    return Router
}

module.exports = postfunction

