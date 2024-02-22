import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handelSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/v1/user/signup", {
        email,
        username,
        password,
      });
      toast.success("Register success");
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <main className='form-app'>
      <div className="form-container">
        <form onSubmit={handelSubmit}>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
          </div>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your username' />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
          </div>
          <button>Register</button>
        </form>
        <p>Already have an account? <Link to={'/login'}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register
