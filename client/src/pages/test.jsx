import React, { useEffect, useState,useContext } from 'react'
import style from '../UserData.module.css'
import axios from 'axios'
import {MyContext} from './Secret'



function UserData() {
  const value = useContext(MyContext);
  console.log(value,"contexttttt")
const userID = value._id
    const [image,setImage] = useState({profile:" "})
    const [userData,setUserData] = useState({})
    const [noImage,setNoImage] = useState(true)
    const [imagefile,setImageFile] = useState()
    const [boolean,setBoolean] = useState(false)
    const imageHandler = (e) =>{
        setImage({...image,profile:e.target.files[0]})
    }
 
     const  imageUploadHandler = (e)=>{
      console.log(image,"imagee")
      e.preventDefault()

      
            var fd = new FormData();
            fd.append('img',image.profile)
            console.log(...fd,"fffffff")
            
               axios.post(`http://localhost:4000/submitImage/:${userID}`,fd).then((data)=>{
                console.log(data.data,"daraaaa");
                setImageFile(data.data)
                setUserData(value)
                    setNoImage(false)
               })

      }

   useEffect(()=>{
    axios.post(`http://localhost:4000/getUserData/:${userID}`).then((data)=>{
      console.log(data.data,"daraaaa");
      setImageFile(data.data.image)
      return()=>{
        console.log("clean up");
          setImageFile('')
          
      }
     })

   },[boolean])   

   const deleteImage = (imageName) =>{
      axios.post(`http://localhost:4000/deleteImage/:${userID}/:${imageName}`).then((data)=>{
      console.log(data.data,"daraaaa");
      setBoolean(true)
      setImageFile('')
     })
   }

   const saved = localStorage.getItem("Imagefile");
   console.log(saved,"savedddddddddd")
    return (
  
        <div className={style.container}> 
       
          <div className={style.card}> 
            <div className={style.imagem}> 
              <img className={style.img} src={`http://localhost:4000/userImage/${imagefile}`} style={{marginLeft:"30px"}}/>
              {
               imagefile && <button style={{height:"30px", marginTop:"20px",paddingTop:"3px"}} onClick={(imagefile)=>{
                  deleteImage(value.image)
                }}><i class="fa fa-trash" aria-hidden="true"></i></button>  
              }   
              
            </div>     
            <div className={style.texto}> 
              <h2 className={style.titulo}>{value.name}</h2>
              <p className={style.desc}>{value.email} <br />{value.number}<br />
                </p>
            </div>  
            <div className={style.button}>
                <form  onSubmit={imageUploadHandler} encType="multipart/form-data" > 
                  {
                  !imagefile && <div>
                     <input type="file" name='image'  className='inputFile'  onChange={imageHandler}/>
                     <button type='submit'  className={style.btn}> submit </button> 
                     </div>
                  } 
                                  
                
                </form>

            </div>
          </div>
        </div>
      );
}

export default UserData