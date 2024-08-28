import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const {isAuthenticated, isLoading} = useAuth0();

  if(isLoading){
    return <div>Loading...</div> // we'll do nothing until auth stuff has finished
  }

  if(isAuthenticated){
    return <Outlet/>
    // outlet means all the child routes
  }
  
  return <Navigate to="/" replace/>

};

export default ProtectedRoute