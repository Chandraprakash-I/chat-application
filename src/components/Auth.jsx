import React,{useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import SignInImage from '../assets/signup.jpg'

const initialState={
    fullName: "",
    userName: '',
    password: "",
    confirmPassword: "",
    phoneNumber:"",
    avatarURL:""
}

const Auth = () => {
    const cookies=new Cookies();
    const [isSignup,setIsSignup]=useState(true);
    const [form,setForm]=useState(initialState);

    const handleSubmit=async (event)=>{
        event.preventDefault();
        console.log(form);

        const{fullName,username,password,phoneNumber,avatarURL}=form;
        const URL="http://localhost:4000/auth";
        const {data:{token,userId,hashedPassword}}=await axios.post(`${URL}/${isSignup?'signup':'login'}`
            ,{
                username:username,
                password:password,
                fullName:fullName,
                phoneNumber:phoneNumber,
                avatarURL:avatarURL
            }
          );

        cookies.set(`token`,token);
        cookies.set(`username`,username);
        cookies.set(`fullName`,fullName);
        cookies.set(`userId`,userId);

        if(isSignup){
            cookies.set('phoneNumber',phoneNumber);
            cookies.set('avatarURL',avatarURL);
            cookies.set('hashedPassword',hashedPassword);

        }

        window.location.reload();

    }
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
        
    }
    const switchMode=()=>{
        setIsSignup((prevIsSignup)=>!prevIsSignup);
    }
  return (
    <div className='auth__form-container'>
        <div className='auth__form-container_fields'>
            <div className='auth__form-container_fields-content'>
                    <p>
                        {isSignup?'Sign Up':'Sign In'}
                    </p>
                    <form onSubmit={handleSubmit}>
                        {isSignup &&(
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='fullName'>Full Name</label>
                                <input 
                                name='fullName'
                                type="text"
                                placeholder='full name'
                                onChange={handleChange}
                                required
                                />


                            </div>
                        )}

                            <div className='auth__form-container_fields-content_input'>
                               
                               <label htmlFor='userName'>User Name</label>
                                <input 
                                name='username'
                                type="text"
                                placeholder='user name'
                                onChange={handleChange}
                                required
                                />


                            </div>
                        
{isSignup &&(
                            <div className='auth__form-container_fields-content_input'>

                              
<label htmlFor='phoneNumber'>Phone number</label>
                                <input 
                                name='phonenumber'
                                type="text"
                                placeholder='phone number'
                                onChange={handleChange}
                                required
                                /> 


                            </div>
                        )}
{isSignup &&(
                            <div className='auth__form-container_fields-content_input'>
                               
                            
<label htmlFor='avatarURL'>Avatar URL</label>
                                <input 
                                name='avatarURL'
                                type="text"
                                placeholder='Avatar URL'
                                onChange={handleChange}
                                required
                                />

                            </div>
                        )}

                       <div className='auth__form-container_fields-content_input'>
                               
                            
<label htmlFor='avatarURL'>Password</label>
                                <input 
                                name='password'
                                type="password"
                                placeholder='Password'
                                onChange={handleChange}
                                required
                                />

                            </div>

                            {isSignup &&(
                            <div className='auth__form-container_fields-content_input'>
                               
                            
<label htmlFor='confirmPassword'>Confirm Password</label>
                                <input 
                                name='confirmPassword'
                                type="password"
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                required
                                />

                            </div>
                        )}

<div className='auth__form-container_fields-content_button'>
    <button>{isSignup?'Sign Up':'Sign In'}</button>
</div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignup ?"Already have an account?"
                            :"Don't hane an account?"
                            }
                            <span onClick={switchMode}>
                                {isSignup?'Sign In':'Sign Up'}
                            </span>
                        </p>
                    </div>
            </div>
        </div>
      <div className='auth__form-container_image'>
        <img src={SignInImage} alt='signIn'/>
      </div>
    </div>
  )
}

export default Auth
