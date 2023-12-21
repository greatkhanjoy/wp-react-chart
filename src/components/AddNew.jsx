import React, { useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";

const AddNew = () => {

    const [name, setName] = useState('')
    const [uv, setUv] = useState('')
    const [pv, setPv] = useState('')
    const [amt, setAmt] = useState('')
    const [date, setDate] = useState('')
    const nonce = `${appLocalizer.nonce}`

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [url, setUrl] = useState(`${appLocalizer.rest_url}`);

    const formHandler = (e) => {
        e.preventDefault();
        setSuccess(false)
        setError(false)

        const headers = {
            'X-WP-Nonce': nonce,
        };

        const data = {
            name: name,
            uv: uv,
            pv: pv,
            amt: amt,
            date: date,
        };

        setLoading(true);

        axios.post(`${url}/settings`, data, { headers })
            .then((res) => {
                toast.success("Added Successfully!");
                setSuccess(true);
            })
            .catch((err) => {
                toast.error("Something went wrong!");
                setError(true)
            })
            .finally(() => {
                setLoading(false);
                setAmt('')
                setDate('')
                setPv('')
                setUv('')
                setName('')
            });
    }
  return (
    <div className='w-[300px] mx-auto'>
        <form onSubmit={formHandler}>
            <div className='grid grid-cols-2 gap-5'>
                <div className='col-span-2 flex flex-col'>
                    <label>Name</label>
                    <input type='text' placeholder='Enter Name' value={name} name='name' required onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <label>UV</label>
                    <input type='number' name='uv' value={uv} required onChange={(e) => setUv(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <label>PV</label>
                    <input type='number' name='pv' value={pv} required onChange={(e) => setPv(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <label>AMT</label>
                    <input type='number' name='amt' value={amt} required onChange={(e) => setAmt(e.target.value)} />
                </div>
                <div className='flex flex-col'>
                    <label>Date</label>
                    <input type='date' name='date' value={date} required onChange={(e) => setDate(e.target.value)} />
                </div>
            </div>
            <button disabled={loading} className='px-6 py-2 bg-green-500 hover:bg-green-600 text-white w-full text-center mt-5'>{loading ? 'Adding' : 'Submit'}</button>
            {success && (<p className='text-green-600 font-bold text-center'>Added Succesfully!</p>)}
            {error && (<p className='text-red-500 font-bold text-center'>Something Went Wrong! try again.</p>)}
            
            
        </form>
    </div>
  )
}

export default AddNew