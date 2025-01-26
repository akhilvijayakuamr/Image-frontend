import React, { useEffect, useState } from 'react'
import './Reset.css'
import { resetRequest } from '../../Interface/AuthInterface'
import { useDispatch } from 'react-redux'
import { resetAsync } from '../../Actions/Action'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Reset: React.FC = () => {
    const [restRequest, setResetRequest] = useState<resetRequest>({
        email: "",
        otp: "",
        password: "",
        confirmpassword: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email');
        const otpParam = urlParams.get('otp');

        if (emailParam || otpParam) {
            setResetRequest((prev) => ({
                ...prev,
                email: emailParam || prev.email,
                otp: otpParam || prev.otp,
            }));
        }
    }, []);



    // Reset password


    const handleReset = async (e: React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await dispatch(resetAsync(restRequest) as any)
            if (response.status >= 200 && response.status < 300) {
                toast.success(response.message, {
                    position: "top-right"
                });
                navigate('/')
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
        <div className='reset-main'>
        <ToastContainer/>
            <div className='reset-container'>
                <form className='reset' onSubmit={handleReset}>
                    <label>Reset Password</label>
                    <input
                        type='text'
                        name='password'
                        placeholder='New password'
                        value={restRequest.password}
                        onChange={(e) => setResetRequest({ ...restRequest, password: e.target.value })}
                        className='reset-input' />
                    <input
                        type='text'
                        name='confirmpassword'
                        placeholder='Enter confirm password'
                        value={restRequest.confirmpassword}
                        onChange={(e) => setResetRequest({ ...restRequest, confirmpassword: e.target.value })}
                        className='reset-input' />
                    <button className='reset-button'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Reset