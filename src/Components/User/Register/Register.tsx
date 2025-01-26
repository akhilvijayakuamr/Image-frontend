import React, { useState } from 'react'
import './Register.css'
import { loginRequest, signUpRequest } from '../../../Interface/AuthInterface'
import { loginAsync, signUpAsync } from '../../../Actions/Action'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
    const [isSignup, setIsSignup] = useState<boolean>(false)
    const [signUpData, setSignUpData] = useState<signUpRequest>({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        password: '',
        confirmpassword: ''
    })
    const [signInData, setSignInData] = useState<loginRequest>({
        email: '',
        password: '',
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const validateSignUp = () => {
        const { username, email, phonenumber, password, confirmpassword } = signUpData;
        if (!username || !email || !phonenumber || !password || !confirmpassword) {
            toast.error('All fields are required!', { position: "top-right" });
            return false;
        }
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            toast.error('Username must contain only letters and numbers!', { position: "top-right" });
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Please enter a valid email address!', { position: "top-right" });
            return false;
        }
        if (!/^\d{10}$/.test(phonenumber)) {
            toast.error('Phone number must be 10 digits!', { position: "top-right" });
            return false;
        }
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters!', { position: "top-right" });
            return false;
        }
        if (password !== confirmpassword) {
            toast.error('Passwords do not match!', { position: "top-right" });
            return false;
        }
        return true;
    }
    const validateSignIn = () => {
        const { email, password } = signInData;
        if (!email || !password) {
            toast.error('Email and password are required!', { position: "top-right" });
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Please enter a valid email address!', { position: "top-right" });
            return false;
        }
        return true;
    }




    // Signup


    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateSignUp()) return;

        try {
            const response = await dispatch(signUpAsync(signUpData) as any)
            if (response.status >= 200 && response.status < 300) {
                toast.success(response.message, {
                    position: "top-right"
                });
            } else {
                toast.error(response.message, {
                    position: "top-right"
                });
            }
        } catch {
            toast.error("After some time you will retry", {
                position: "top-right"
            });
        }

    }



    // Login


    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateSignIn()) return;
        try {
            const response = await dispatch(loginAsync(signInData) as any)
            if (response.status >= 200 && response.status < 300) {
                toast.success(response.message, {
                    position: "top-right"
                });
                navigate('/home')
            } else {
                toast.error(response.message, {
                    position: "top-right"
                });
            }
        } catch {
            toast.error("After some time you will retry", {
                position: "top-right"
            });
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='main'>
                <input
                    type='checkbox'
                    id='chk'
                    aria-hidden="true"
                    checked={!isSignup}
                    onChange={() => setIsSignup(!isSignup)}
                />
                {isSignup ?

                    <div className='signup'>
                        <form onSubmit={handleSignUp}>
                            <label >
                                Sign Up
                            </label>
                            <input
                                type='text'
                                name='username'
                                value={signUpData.username}
                                onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                                placeholder='User Name' />
                            <input
                                type='email'
                                name='email'
                                value={signUpData.email}
                                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                                placeholder='Email' />
                            <input
                                type='number'
                                name='phonenumber'
                                value={signUpData.phonenumber}
                                onChange={(e) => setSignUpData({ ...signUpData, phonenumber: e.target.value })}
                                placeholder='Phone number' />
                            <input
                                type='firstName'
                                name='firstName'
                                value={signUpData.firstname}
                                onChange={(e) => setSignUpData({ ...signUpData, firstname: e.target.value })}
                                placeholder='First Name' />
                            <input
                                type='lastName'
                                name='lastName'
                                value={signUpData.lastname}
                                onChange={(e) => setSignUpData({ ...signUpData, lastname: e.target.value })}
                                placeholder='Last Name' />
                            <input
                                type='password'
                                name='password'
                                value={signUpData.password}
                                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                                placeholder='Password' />
                            <input
                                type='confirmPassword'
                                name='confirmPassword'
                                value={signUpData.confirmpassword}
                                onChange={(e) => setSignUpData({ ...signUpData, confirmpassword: e.target.value })}
                                placeholder='Confirm Password' />
                            <button type='submit'>Sign Up</button>
                            <label htmlFor='chk' aria-hidden="true" className='loginre'>
                                Sign In
                            </label>
                        </form>
                    </div>

                    :

                    <div className='signin'>
                        <form className='loginForm' onSubmit={handleSignIn}>
                            <label className='loginLabel'>Login</label>
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={signInData.email}
                                onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                            />
                            <input
                                type='password'
                                name='password'
                                value={signInData.password}
                                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                                placeholder='Password' />
                            <button type='submit'>Sign In</button>
                            <label htmlFor='chk' aria-hidden="true" className='loginre'>Sign Up</label>
                        </form>
                    </div>

                }
            </div>
        </>
    )

}

export default Register