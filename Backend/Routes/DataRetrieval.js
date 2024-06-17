const express = require('express')
const Router = express.Router()
const writeToSheet=require('../Helper/Excel.js')
let timestamp=0

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const returnData=(conn)=>{

    Router.get('/',(req,res)=>{
        const formattedTimestamp = timestamp === 0 ? 0 : `'${timestamp}'`;
        let sql=`SELECT * FROM SUBMISSIONS WHERE tstamp>${formattedTimestamp} ORDER BY TSTAMP ;`
        try {
            conn.query(sql,(error,result)=>{
                if(error)
                    res.status(400).send(error)
                else{
                    // console.log(result)
                    if(result.length===0){
                        res.status(200).send('No records found')
                        return
                    }
                    
                    timestamp=formatDate(result[result.length-1].TSTAMP)
                    writeToSheet(result)
                    sql=`SELECT * FROM SUBMISSIONS ORDER BY TSTAMP;`
                    conn.query(sql,(error,rslt)=>{
                        if(error)
                            {res.status(500).send(error)
                                return
                            }
                        else{
                            res.status(200).send(rslt)
                        }
                    })
                }
            })
        } catch (error) {
            res.status(400).send(error)
        }
    })
    return Router
}

module.exports=returnData