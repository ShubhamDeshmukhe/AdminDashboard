import React from 'react'
import Dashboard from './Components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Edit from './Components/Edit'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' Component={Dashboard} />
        <Route path='/edit/:id' Component={Edit} />
      </Routes>
    </div>
  )
}

export default App