import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';

export default function List() {
    const [formData, setFormData] = useState([]);
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    const url=process.env.REACT_APP_URL
    const getdata=()=>{
        axios.get(`${url}/get-data`).then((result)=>{
            console.log(result.data)
            setFormData(result.data)
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        getdata()
    },[])

    const handlenewEntry=()=>{
        localStorage.removeItem('medwanderer')
        navigate('/')
    }
    const handleRefresh=()=>{
        setLoading(true)
        getdata()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-xl font-bold my-4 text-center ">Form Data Table</h1>
            <div className="flex justify-center my-4">
                <button className="bg-blue-500 p-2 text-white rounded mx-2" onClick={handlenewEntry}>Add new entry</button>
                <button className="bg-red-500 p-2 text-white rounded mx-2" onClick={handleRefresh}>Refresh</button>

            </div>
            {loading &&
                <div className="flex justify-center p-4">
                    <Loader size={96} />
                </div>
            }
            {!loading &&<div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">#</th>
                            <th className="py-3 px-6 text-left">Form Type</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Country Code</th>
                            <th className="py-3 px-6 text-left">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {formData.map((data,index) => (
                            <tr key={data.slNo} className={`border-b bg-gray-${index%2===0?'0':'100'} hover:bg-gray-300 `}>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{index+1}</td>
                                <td className="py-3 px-6 text-left">{data.FROM_TYPE}</td>
                                <td className="py-3 px-6 text-left">{data.NAME}</td>
                                <td className="py-3 px-6 text-left">{data.COUNTRY_CODE}</td>
                                <td className="py-3 px-6 text-left">{data.PHONE_NUMBER}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </div>
    )
}
