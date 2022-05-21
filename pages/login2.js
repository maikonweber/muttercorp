import React,{useState} from "react";
import Style from "../styles/login.module.css";
import { RiEyeCloseLine,RiEyeLine } from "react-icons/ri"
import {setCookie} from 'nookies';
import { useRouter } from 'next/router'
import { loginIn } from '../src/services/services';
import Head from 'next/head';
// Sing in form with styled components

const Login = () => {
    const [password, setPassword] = useState('');
    const [show,setShow] = useState(false);
    const [email, setEmail] = useState('');    

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email != '' && password != '')  {
    
           const token = await loginIn(email,password)          
           if (token) {
                console.log(token)
               setCookie(undefined, 'nextauth.token', token, {
                   maxAge: 60 * 60 * 60 * 60,
               });
      
               router.push('/DashboardBlaze');
      
            } else {
      
                alert('Email ou senha incorretos')
            }
        
            } else {
            alert('Email ou senha Invalidos')     
           }  
       }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    return (
        
            <div className={Style.container}>
                  <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <title>Nagano Consultoria</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
                <form  className={Style.formulario} onSubmit={(e)=>handleSubmit(e)} >
                    <strong  className={Style.title}>Login</strong>
                    <label  className={Style.label}>
                    Email:
                    <input  className={Style.input} type="text" onChange={handleEmail} />
                    </label>
                    <label  className={Style.label}>
                    Password:
                    <input  className={Style.input} type={show ? "text":"password"} onChange={handlePassword} />
                    <div  className={Style.contEye} onClick={()=>setShow(!show)}>
                        {show 
                        ? <RiEyeLine size={20}/>
                        :<RiEyeCloseLine size={20}/>
                        }
                    </div>
                    </label>
                    <button   className={Style.button} type="send" >
                        Entrar
                    </button >
                </form>
            </div>

        );
}

export default Login;