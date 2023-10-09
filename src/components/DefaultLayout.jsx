import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext();

  if (!token) {
    return <Navigate to="/"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  // useEffect(() => {
  //   axiosClient.get('/user')
  //     .then(({data}) => {
  //        setUser(data)
  //     })
  // }, [])

  return (
    <div id="defaultLayout">
      <Outlet />
    </div>
  )
}
