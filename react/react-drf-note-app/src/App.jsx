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
  const [searchText, setSearchText] = useState("")
  const [filterText, setFilterText] = useState("")

  const handleFilterText = (val) => {
    setFilterText(val);
  };

  const handleSearchText = (val) => {
    setSearchText(val)
  }

  const filteredNotes = filterText === "BUSINESS" ? notes.filter(note => note.category=="BUSINESS") 
  : filterText === "PERSONAL" ? notes.filter(note => note.category=="PERSONAL")
  : filterText === "IMPORTANT" ? notes.filter(note => note.category=="IMPORTANT")
  : notes 

    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
      .then(res => {
        console.log(res.data)
        setNotes(res.data)
      })
      .catch(err => {
        console.log(err.message)
      })
    }, [searchText])

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

  const deleteNote = (slug) => {
    axios.delete(`http://127.0.0.1:8000/notes/${slug}`)
    .then(res => {
      setNotes([...notes])
    })
    .catch(err => console.log(err.message))
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout searchText={searchText} handleSearchText={handleSearchText}/>,
      children: [
        {
          index: true,
          element: <HomePage notes={filteredNotes} loading={isLoading} handleFilterText={handleFilterText}/>,
          loader: async () => {
            const response = await axios.get("http://127.0.0.1:8000/notes/");
            return response.data;
          }
        },
        { path: "add-note", element: <AddNotePage addNote={addNote}/> },
        { path: "edit-note/:slug", element: <EditNotePage updateNote={updateNote} /> },
        { path: "notes/:slug", element: <NoteDetailPage deleteNote={deleteNote} />  }
      ]
    }
  ]);

  return <RouterProvider router={router} />
  
}

export default App