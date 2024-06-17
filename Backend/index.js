const express=require('express')
const app=express()
const cors=require('cors')
const mysql2=require('mysql2')
require('dotenv').config()
const formAddition=require('./Routes/FormAddition.js')
const dataRetreival=require('./Routes/DataRetrieval.js')
app.use(express.json());
app.use(cors())
const port=process.env.PORT


const conn = mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Port is specified separately from the host
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME
});



conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
    app.listen(port, () => {
        console.log('App listening on port: ', port)
    })
});


app.use('/form-addition',formAddition(conn))
app.use('/get-data',dataRetreival(conn))



