import { useAuth0 } from "@auth0/auth0-react"
import {useCreateMyUser} from "@/api/MyUserApi"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// this is the page user will first redirected to after login through api0 
const AuthCallBackPage = () => {
  const navigate = useNavigate()
  const {user} = useAuth0(); // current logged in user
  const {createUser} = useCreateMyUser() // creating user function

  const hasCreatedUser = useRef(false) // we r just being extra sure that the createUser fires only once

  useEffect(() => {
    if(user?.sub && user?.email && !hasCreatedUser.current){
      createUser({auth0Id:user.sub, email:user.email}) // data send to post req.
      hasCreatedUser.current = true
    }
    navigate("/")
  }, [createUser, navigate, user]);

  return<>Loading...</>
}

export default AuthCallBackPage