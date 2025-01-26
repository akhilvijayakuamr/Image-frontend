import React from 'react'
import './Header.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../../Redux/slice/UserSlice';

const Header:React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () =>{
        dispatch(userLogout())
        navigate('/')
    }

    const handleHome =()=>{
      navigate('/posts')
    }

    const handlePost =()=>{
      navigate('/home')
    }

    const handleReset =()=>{
      navigate('/email')
    }

    return (
      <header>
         <input type='checkbox' name='' id='chk1'/>
        <div className='logo'><h1>Blog Master</h1></div>
      
        <ul>
          <li><a onClick={handlePost}>Create</a></li>
          <li><a onClick={handleHome}>Home</a></li>
          <li><a onClick={handleReset}>reset</a></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
        <div className='menu'>
          <label htmlFor='chk1'>
            <i className="fas fa-bars"></i>
          </label>
        </div>
      </header>
       
    );
  };
  
  export default Header;