import React, { useState } from 'react'
import './Email.css'
import { emailRequest } from '../../Interface/AuthInterface'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { emailAsync } from '../../Actions/Action'
import Header from '../User/Header/Header'


const Email: React.FC = () => {

    const [email, setEmail] = useState<emailRequest>({ email: '' })
    const dispatch = useDispatch()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!emailRegex.test(email.email)) {
            toast.error("Please enter a valid email address.", {
                position: "top-right"
            })
            return
        }
        try {
            const response = await dispatch(emailAsync(email) as any)
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

    return (
        <>
        <Header/>
        <ToastContainer/>
            <div className='email-main'>
                <div className='email-container'>
                    <form className='reset' onSubmit={handleEmail}>
                        <label>
                            Reset Password
                        </label>
                        <input
                            className='email-input'
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={email.email}
                            onChange={(e) => setEmail({ ...email, email: e.target.value })}
                        />
                        <button className='email-button'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Email