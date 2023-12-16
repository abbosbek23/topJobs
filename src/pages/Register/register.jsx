import {useForm} from 'react-hook-form';
import { AddUser, checkEmail } from '../../api/Auth';
import {toast} from 'react-toastify'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../Context/Context';
function Register() {


    const {register, handleSubmit,reset, formState: {errors}} = useForm({
        mode: "onBlur"
    })
    

    const [openCode,setOpenCode] = useState(false)
    const [fieldEmail, setFieldEmail] = useState(false)
    const [code,setCode] = useState()
    const [email,setEmail] = useState("")
    const navigate = useNavigate()
    const {users} = useContext(MainContext)

    const onsubmit = async (datas) => {
            const {success,data,errormessage} = await AddUser(datas);
           
            if(success){
            toast.success(data.message)
            setOpenCode(true)    
           
            setEmail(datas.email)
            }else{
                toast.error(errormessage)   
            }  
            reset()
    }

    const  OpenCode  = async () =>{
         
    }

    const CheckCode = async ()=>{
     
          const data = await checkEmail({email,verification_code:+code})
         
          
          if(data.access_token){
            navigate("/")
            users({code,email})
            localStorage.setItem("access",data.access_token)
          }else{
            alert("xato")
          }
    }

    return (
        <div className={'container'}>
            <div className="row text-center">
                <div className="col-md-6 my-5 offset-3">
                    <h1 className={'my-5'}>Register</h1>
                    <form className={'form-control my-5'} onSubmit={handleSubmit(onsubmit)} id={'users'}>


                        <label className='w-50'>
                            {openCode ? "":<p>Name</p>}
                            <input className='form-control' type='text' disabled={openCode ? true:false} style={openCode ? {opacity:'0.5',cursor:"no-drop",display:"none"}:{}} placeholder="username" {...register("username", {
                                required: "Inputni to'ldir",
                                minLength: {
                                    value: 4,
                                    message: "Kamida 4 harf"
                                }
                            })} />
                        </label>

                       {openCode ? "":<div style={{height: '25px', color: "#FF0000"}}>{
                            errors?.username && <p style={{color: "red"}}>{errors?.username?.message || "Error"}</p>
                        }</div>} 

                        <label className='w-50'>
                        {openCode ? "":<p>Email</p>}
                            <input type='email' placeholder='Email' disabled={openCode ? true:false} style={openCode ? {opacity:'0.5',cursor:"no-drop",display:"none"}:{}} className='form-control' {...register("email", {
                                required: "Inputni to'ldir",
                                minLength: {
                                    value: 4,
                                    message: "4 ta harf va @ belgi"
                                }
                            })} />
                        </label>
                        {openCode ? "":<div style={{height: '25px', color: "#FF0000"}}>{
                            errors?.email && <p style={{color: "red"}}>{errors?.email?.message || "Error"}</p>
                        }</div>} 
                        <label className='w-50'>
                        {openCode ? "":<p>Password</p>}
                            <input type='password' style={openCode ? {opacity:'0.5',cursor:"no-drop",display:"none"}:{}} disabled={openCode ? true:false} className='form-control'
                                   placeholder='Password' {...register("password", {
                                required: "Inputni to'ldir",
                                minLength: {
                                    value: 4,
                                    message: "Kamida 8 ta bo'lishi kerak"
                                }
                            })} />
                        </label>
                        {openCode ? "" : <div style={{height: '23px', color: "#FF0000"}}>{
                            errors?.password && <p style={{color: "red"}}>{errors?.password?.message || "Error"}</p>
                        }</div>}
                        <div style={{height:"100px"}}></div>
                       
                        <button onClick={OpenCode} className='btn btn-primary mb-3' style={openCode ? {display:"none"}:{}} form='users'>Check Email</button>
   
                        {
                            openCode ? <div style={{marginTop:"-130px",textAlign:'center',alignItems:"center",}}>
                                <div style={{width:"150px",marginLeft:"185px", marginBottom:"10px"}}>
                              
                                <input type="number" className='form-control' onChange={(e)=>setCode(e.target.value)}/>
                                </div>
                            <button onClick={CheckCode} className='btn btn-primary' style={{padding:"8px",fontSize:"12px"}}>Check code</button></div>:""
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register