import React, { useState } from 'react'
import Form from './Form'
import axios from 'axios'

export default function Login() {
    const [form_type,setForm_type]=useState(0)
    const updateFormType=(e)=>{
       setForm_type(e.target.value)
    }
    const url =process.env.REACT_APP_URL
   
    const sendValue=(value)=>{
        const obj={...value,form_type}
        console.log(obj)
        axios.post(`${url}/form-addition`,obj).then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        })
    }
  return (
    <div className='min-h-screen flex justify-center mt-8 '>
      <div className={`form p-2 w-1/3   ${form_type===0?'h-24':''}`}>
        <div className="buttons flex justify-center w-full p-2 rounded shadow">
          <button className="bg-blue-400 rounded p-2 mx-4 text-white" value='A' onClick={updateFormType} >Form A</button>
          <button className="bg-blue-400 rounded p-2 mx-4 text-white" value='B' onClick={updateFormType} >Form B</button>
        </div>
        <div>
            {form_type!==0 && <Form type={form_type} sendValue={sendValue} />}
        </div>
      </div>
    </div>
  )
}
