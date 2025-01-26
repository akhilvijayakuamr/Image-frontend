import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store/store'
import { Navigate, Outlet } from 'react-router-dom'

const  PublicRoute =()=> {
  const access = useSelector((state:RootState)=>state.auth.access)
  const refresh = useSelector((state:RootState)=>state.auth.refresh)

  return access || refresh ? <Navigate to='/posts'/>:<Outlet/>
}

export default PublicRoute;