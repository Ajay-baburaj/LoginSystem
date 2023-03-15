import React ,{useState,useEffect,useContext}from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { ToastContainer,toast } from 'react-toastify';


function Login() {
    const [values,setValues] = useState({email:"",password:""})
    const navigate = useNavigate();
    const [cookies] = useCookies([])

    useEffect(()=>{
      if(cookies.jwt){
        navigate('/')
      }
    },[cookies,navigate])

    const generateError = (error) =>
    toast.error(error, {
      position: "top-center",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      console.log("---------"+data)
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div  className='container'>
        <ToastContainer/>
        <h2></h2>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>{
              setValues({ ...values, [e.target.name]: e.target.value })
            }
              
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
          Don't have an account ?<Link to="/register"> Register</Link>
        </span>
      </form>

    </div>
  )
}

export default Login