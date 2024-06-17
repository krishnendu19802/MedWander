import React, { useState } from 'react'
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import Loader from '../Loader/Loader';
export default function Form({ type,sendValue }) {
   
    const countryCodes = [
        { display: 'IN(+91)', value: '+91' },
        { display: 'US(+1)', value: '+1' },
        { display: 'UK(+44)', value: '+44' },
        { display: 'AU(+61)', value: '+61' },
        { display: 'RU(+7)', value: '+7' },

    ]

    const [details, setDetails] = useState({
        'name': '',
        'country_code': '+91',
        'phone_number': ''
    })

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    const containsNumber = (str) => {
        const regex = /\d/; // \d matches any digit (0-9)
        return regex.test(str);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(details)
        // setError('');
        const fullNumber = details.country_code + details.phone_number;
        const phoneNumberObj = parsePhoneNumberFromString(fullNumber);

        if (!(phoneNumberObj && phoneNumberObj.isValid())) {

            setError('Invalid phone number for the selected country code.');
            return
        }
        if ((containsNumber(details.name))) {
            setError('Name cannot contain numbers');
            return

        }
        if(details.name.length===0){
            setError('Enter name')
            return
        }
        sendValue(details)
    };



    return (
        <div >
            
            
            <form onSubmit={handleSubmit} className="bg-white mt-4 p-8 rounded shadow-md w-full ">
                <h2 className="text-2xl font-bold mb-4 text-center">Form {type}</h2>
                <hr />
                <label className="block my-4 font-medium">
                    Name
                    <input
                        type="text"
                        value={details.name}
                        name='name'
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border rounded"
                        required
                    />
                </label>
                <label className="block my-4 font-medium">
                    Country Code
                    <select
                        value={details.country_code}
                        name='country_code'
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border rounded"
                    >
                        {countryCodes.map((ct) => {
                            return (<option value={ct.value}>{ct.display}</option>)
                        })}
                    </select>
                </label>

                <label className="block my-4 font-medium">
                    Phone Number
                    <input
                        type="text"
                        value={details.phone_number}
                        name='phone_number'
                        onChange={handleChange}
                        className="block w-full mt-1 p-2 border rounded"
                        required

                    />
                </label>

                {error && <p className="text-red-500">{error}</p>}

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
