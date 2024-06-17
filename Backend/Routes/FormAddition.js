const express = require('express')
const Router = express.Router()

require('dotenv').config()

const postfunction = (conn) => {
    
    Router.post('/', async (req, res) => {
        const { form_type, name, country_code, phone_number } = req.body

        // console.log(form_type)
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

