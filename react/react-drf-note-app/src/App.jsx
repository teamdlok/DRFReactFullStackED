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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get("http://127.0.0.1:8000/notes/")
    .then(res => {
      console.log(res.data)
      setNotes(res.data)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage notes={notes} loading={isLoading}/>,
          loader: async () => {
            const response = await axios.get("http://127.0.0.1:8000/notes/");
            return response.data;
          }
        },
        { path: "add-note", element: <AddNotePage /> },
        { path: "edit-note/:id", element: <EditNotePage /> },
        { path: "notes/:slug", element: <NoteDetailPage /> }
      ]
    }
  ]);

  return <RouterProvider router={router} />
  
}

export default App