import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function Register() {
  const [cookies] = useCookies([])
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: "", password: "" })

  useEffect(()=>{
    if(cookies.jwt){
      navigate('/')
    }
  },[cookies,navigate])
  const generateError = (error) =>
    toast.error(error, {
      position: "top-center",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const { data } = await axios.post('http://localhost:3001/register',
        {
          ...values
        },
        {
          withCredentials: true,
        }
        )
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) {
            generateError(email)
          }
          else if (password) {
            generateError(password)
          }


        } else {
          navigate('/')
        }

      }


    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className='container'>
      <ToastContainer />
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account ?<Link to="/login"> Login</Link>
        </span>
      </form>

    </div>
  )
}

export default Register