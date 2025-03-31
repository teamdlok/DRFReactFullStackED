import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './latouts/MainLayout'
import AddNotePage from './pages/AddNotePage'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import EditNotePage from './pages/EditNotePage.jsx'
import axios from 'axios'
import { toast } from 'react-toastify';

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


  const addNote = (data) => {
    axios.post("http://127.0.0.1:8000/notes/", data)
    .then(res => {
      setNotes([...notes, data])
      toast.success("A new note has been added");
      console.log(res.data)
    })

    .catch(err => {
      console.log(console.log(err.message))
    })

  }

  const updateNote = (data, slug) => {
    axios.put(`http://127.0.0.1:8000/notes/${slug}`, data)
    .then(res => {
      console.log(res.data)
      toast.success("Note updated succesfully")
    })

    .catch(err => console.log(err.message))

  }

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
        { path: "add-note", element: <AddNotePage addNote={addNote}/> },
        { path: "edit-note/:slug", element: <EditNotePage updateNote={updateNote} /> },
        { path: "notes/:slug", element: <NoteDetailPage /> }
      ]
    }
  ]);

  return <RouterProvider router={router} />
  
}

export default App