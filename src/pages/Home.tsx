import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {formatDistance} from 'date-fns'

interface MoneyType {
  _id: string,
  description: string,
  amount: Number,
  mode: string,
  userId: string,
  createdAt: Date
}
const host = import.meta.env.VITE_HOST

const Home = () => {
  const [data, setData] = useState<MoneyType[]>()
  const [show, setShow] = useState(false)
  const [amount, setAmount] = useState<Number>()
  const [description, setDescription] = useState('')
  const [mode, setMode] = useState('')


  const token = localStorage.getItem('token')
  const profileData = async () =>{
    try {
      const response = await axios(`${host}/money`, {
        headers: {
          Authorization: token
        }
      })
      
      setData(response.data)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  useEffect(()=> {
    profileData()
  }, [])

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!amount || !description || !mode) return toast.error('All fields are required')
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(`${host}/money/add`, {
        amount,
        description,
        mode
      }, {
        headers: {
          Authorization: token
        }
      })
      toast.success(response.data.message)
      profileData()
      setShow(!show)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  
  const deleteData = async (id: string) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.delete(`${host}/money/delete/${id}`, {
        headers: {
          Authorization: token
        }
      })
      toast.success(response.data.message)
      profileData()
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <main className='w-full h-screen'>
      <h1 className='text-3xl font-bold text-center my-6'>Your Spends</h1>
      <div className='flex items-center w-full justify-center mb-5'>
      <button className='btn-primary' onClick={() => setShow(!show)}>Add Spend</button>
      </div>
      
      {show && (
        <>
        <div className='flex items-center justify-center mb-5'>
        <form onSubmit={handelSubmit}>
          <div>
            <label htmlFor="amount">Amount</label>
            <input className="input-outline" type="number" id="amount" placeholder="Enter Amount" onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input className="input-outline" type="text" id="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label htmlFor="mode">Mode</label>
            <input className="input-outline" type="text" id="mode" placeholder="Enter mode" value={mode} onChange={(e) => setMode(e.target.value)} />
          </div>
          <button className="btn-primary mt-3">Add</button>
        </form>
      </div>
        </>
      )}

      <div className='flex items-center flex-col gap-4 '>
        {
          data && data.map((item: MoneyType) => {
            return (
              <div key={item._id} className='flex flex-col md:w-[400px] sm:w-[300px] border border-black p-4 rounded-md'>
                <p>Amount: {String(item.amount)}</p>
                <p>Description: {item.description}</p>
                <p>Mode: {item.mode}</p>
                <p>Date: {formatDistance(new Date(item.createdAt), new Date())}</p>
                <button className='btn-outline-sm mt-2' onClick={() => deleteData(item._id)}>Delete</button>
              </div>
            )
          })
        }
        {data && data.length === 0 && <p>No Data</p>}
      </div>
    </main>
  )
}

export default Home
