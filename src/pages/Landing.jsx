import React from 'react'
import { Navigate } from 'react-router-dom';
import { useStateContext } from "../context/ContextProvider";

const Landing = () => {
  const { user, token } = useStateContext();

  if (token) {
    return <Navigate to="/home" />;
  }
  return (
    <div>Landing</div>
  )
}

export default Landing