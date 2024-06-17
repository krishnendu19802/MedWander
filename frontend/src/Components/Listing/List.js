import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function List() {
    const [formData, setFormData] = useState([]);
    const url=process.env.REACT_APP_URL
    const getdata=()=>{
        axios.get(`${url}/get-data`).then((result)=>{
            console.log(result.data)
            setFormData(result.data)
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        getdata()
    },[])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-xl font-bold mb-4">Form Data Table</h1>
            <div className="overflow-x-auto">
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
                                <td className="py-3 px-6 text-left whitespace-nowrap">{index}</td>
                                <td className="py-3 px-6 text-left">{data.FROM_TYPE}</td>
                                <td className="py-3 px-6 text-left">{data.NAME}</td>
                                <td className="py-3 px-6 text-left">{data.COUNTRY_CODE}</td>
                                <td className="py-3 px-6 text-left">{data.PHONE_NUMBER}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
