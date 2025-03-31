import React from 'react'
import Filter from '../components/Filter'
import NoteCardContainer from '../components/NoteCardContainer'

const HomePage = ({notes, loading, handleFilterText, filterText}) => {
  return (
    <>
    <Filter handleFilterText={handleFilterText}/>
    <NoteCardContainer notes={notes} loading={loading}/>
    </>
  )
}

export default HomePage