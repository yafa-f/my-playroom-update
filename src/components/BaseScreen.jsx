import React from 'react'
import { NavBar } from './NavBar/navBar'
import { Routing } from '../utils/routing'

export const BaseScreen=()=> {
  return (
    <div>
        <NavBar/>
        <Routing/>
    </div>
  )
}
