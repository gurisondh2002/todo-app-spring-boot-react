import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Welcome() {
     const {username} = useParams();

  return (
    <>
    <div>Welcome {username} </div>
    <div>
        <h2>Manage your <Link to="/todos">Todos</Link></h2>
    </div>
    </>
  )
}

export default Welcome