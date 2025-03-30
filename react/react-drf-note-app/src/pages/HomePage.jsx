import React from 'react'
import Filter from '../components/Filter'
import NoteCardContainer from '../components/NoteCardContainer'

const HomePage = ({notes}) => {
  return (
    <>
    <Filter />
    <NoteCardContainer notes={notes}/>
    </>
  )
}

export default HomePage