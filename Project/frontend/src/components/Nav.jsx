import React, { useContext } from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { Context } from '../main';

const Nav = () => {
  const {setIsAuthenticated, isAuthenticated} = useContext(Context);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {withCredentials: true}
      );
      toast.success(data.message, { icon: "✅" });
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message, { icon: "❌" });
    }
  };
  return (
    <>
    {
      isAuthenticated && (<nav>
        <Link onClick={handleLogout}>LOGOUT</Link>
      </nav>
    )}
    </>
  )
}

export default Nav
