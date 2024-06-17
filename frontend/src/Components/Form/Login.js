import React, { useEffect, useState } from 'react'
import Form from './Form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader/Loader'

export default function Login() {
  const [form_type, setForm_type] = useState(0)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(false)

  const updateFormType = (e) => {
    setForm_type(e.target.value)
  }
  const url = process.env.REACT_APP_URL
  const navigate = useNavigate()
  const sendValue = (value) => {
    const obj = { ...value, form_type }
    console.log(obj)
    axios.post(`${url}/form-addition`, obj).then((result) => {
      localStorage.setItem('medwanderer', JSON.stringify(obj))
      navigate('/list')
    }).catch((error) => {
      alert('Some error occurred')
      console.log(error)
    })
  }
  useEffect(()=>{
    let value=localStorage.getItem('medwanderer')
    // console.log(value)
    if(value!==null){
      navigate('/list')
    }
    setLoading(false)
  },[])
  return (
    <div className='min-h-screen flex justify-center mt-8 '>
      {loading &&
                <div className="flex justify-center p-4">
                    <Loader size={96} />
                </div>
            }
            
      {!loading && <div className={`hidden sm:block form p-2 w-2/5 sm:w-1/2 xl:w-1/3   ${form_type === 0 ? 'h-24' : ''}`}>
        <div className="buttons flex justify-center w-full p-2 rounded shadow">
          <button className="bg-blue-400 rounded p-2 mx-4 text-white" value='A' onClick={updateFormType} >Form A</button>
          <button className="bg-blue-400 rounded p-2 mx-4 text-white" value='B' onClick={updateFormType} >Form B</button>
        </div>
        <div>
          {form_type !== 0 && <Form type={form_type} sendValue={sendValue} />}
        </div>
      </div>}

      {!loading &&<div className="block w-4/5 sm:hidden">
        <div className="formA">
          <div className="flex justify-center my-3">
            <button className="bg-blue-400 rounded p-2 mx-4 text-white" value='A' onClick={updateFormType} >Form A</button>
          </div>
          {form_type==='A' && <Form type={form_type} sendValue={sendValue}/>}
        </div>

        <div className="formB">
          <div className="flex justify-center my-3">
          <button className="bg-blue-400 rounded p-2 mx-4 text-white" value='B' onClick={updateFormType} >Form B</button>

          </div>
          {form_type==='B' && <Form type={form_type} sendValue={sendValue}/>}
        </div>
      </div>}
    </div>
  )
}
