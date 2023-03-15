import React, { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {Helmet} from "react-helmet";
import TradingViewWidget,{Themes} from "react-tradingview-widget";

 function Landingpage() {
  const navigate = useNavigate();
  const [profile,setProfile] = useState({userName:'',email:'',userImage:''})
  const [cookies, setCookie, removeCookie] = useCookies([]);


  useEffect(() => {

    const script = document.createElement('script');
    script.async = true;
    document.body.appendChild(script)
  
      const verifyUser = async () => {
      console.log(cookies.jwt)
      if (!cookies.jwt) {
        console.log(cookies)
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:3001/",
          {},
          {
            withCredentials: true,
          }
        );
          console.log(data)

        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else{
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
        }
          
      }
    };
    verifyUser();

    return ()=>{
      document.body.removeChild(script)
    }
  }, [cookies, navigate, removeCookie]);

const logOut = ()=>{
  removeCookie("jwt");
  navigate('/login')
}
  return (
    <>
    <div className="logout-btn-container" style={{padding:"10px"}}>
      <Link to={'/profile'}><button>show profile</button></Link>
      <button onClick={logOut} style={{"margin-top":"10px"}}>Log out</button>
      <ToastContainer />
    </div>

    <div className="tradingView-container">

    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
  
      <TradingViewWidget 
      symbol="BTCUSDT"
      theme={Themes.DARK} 
      />
    </div>

    </div>

   

    
    </>
  )
}

export default Landingpage


