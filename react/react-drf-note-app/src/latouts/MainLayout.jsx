import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const MainLayout = ({searchText, handleSearchText}) => {
  return (
    <>
    <NavBar searchText={searchText} handleSearchText={handleSearchText}/>
    <ToastContainer />
    <Outlet />
    </>
  )
}

export default MainLayout