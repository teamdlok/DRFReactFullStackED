import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './latouts/MainLayout'
import AddNotePage from './pages/AddNotePage'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import EditNotePage from './pages/EditNotePage.jsx'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/notes/")
    .then(res => {
      console.log(res.data)
      setNotes(res.data)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])

    const router = createBrowserRouter(createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage notes={notes} />} />
        <Route path='/add-note' element={<AddNotePage />} />
        <Route path='/edit-note/:id' element={<EditNotePage />} />
        <Route path='note-detail/:id' element={<NoteDetailPage />} />
      </Route>
    ))

  return <RouterProvider router={router} />
  
}

export default App