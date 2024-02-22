import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

interface UserType {
  _id: string,
  username: string,
  email: string,
  password: string;
}

const Home = () => {
  const [user, setuser] = useState<UserType>()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
  const signoutBtn = () =>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  const profileData = async () =>{
    try {
      const response = await axios('/api/v1/user/profile', {
        headers: {
          Authorization: token
        }
      })
      
      setuser(response.data)
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }
  useEffect(()=> {
    // if(!token){
    //   navigate('/login')
    // }
    profileData()
  }, [])
  return (
    <main className='home-container'>
      <div className='home'>
        <h1>{user && user.username}</h1>
        <p>{user && user.email}</p>
        <button onClick={signoutBtn}>sign out</button>
      </div>
    </main>
  )
}

export default Home
