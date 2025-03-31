import React, { useEffect } from 'react'
import "./NoteDetailPages.css"
import { FiEdit } from "react-icons/fi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FormatDate } from '../components/FormatDate';

const NoteDetailPage = () => {

  const [note, setNote] = useState({})

  const {slug} = useParams()

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/notes/${slug}`)
    .then(res => {
      setNote(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, [slug])

  return (
    <>
    <div className="note-container">
    <h3 className="title">{note.title}</h3>
    <span className="d-flex justify-content-center">
    <p className="note-date font-12 text-muted me-5">created: {FormatDate(note.created)}</p>
    <p className="note-date font-12 text-muted me-5">updated: {FormatDate(note.created)}</p>
    </span>
    <span className="button-group">
      <Link to={`/edit-note/${slug}`}>
      <button className="btn btn-primary"><FiEdit /><span>Edit</span></button>
      </Link>
      <button className="btn btn-danger"><BiSolidTrashAlt /><span>Delete</span></button>
    </span>
    <p className="description">
     {note.body}
    </p>



    

  </div>
  {/* <Modal /> */}
  </>
  )
}

export default NoteDetailPage