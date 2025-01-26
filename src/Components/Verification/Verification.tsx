import React, { useEffect, useState } from 'react'
import './Verification.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { verifyAsync } from '../../Actions/Action';
import { useNavigate } from 'react-router-dom';

const Verify: React.FC = () => {

    const [email, setEmail] = useState<string | null>(null);
    const [otp, setOtp] = useState<string | null>(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email');
        const otpParam = urlParams.get('otp');

        if (emailParam && otpParam) {
            setEmail(emailParam);
            setOtp(otpParam);
        }
    }, []);

    const handleVerify = async () => {
        if (email && otp) {
            const verifyRequest = { email, otp }
            try {
                const response = await dispatch(verifyAsync(verifyRequest) as any)
                console.log(response.message)
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

        } else {
            toast.error('Email or OTP is missing', { position: "top-right" });
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="button-container">
                <button className="verify-button" onClick={handleVerify}>Verify Your Account</button>
            </div>
        </>
    )
}

export default Verify