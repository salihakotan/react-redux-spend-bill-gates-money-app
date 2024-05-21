import React from 'react'
import "./styles.css"
import {Heading} from "@chakra-ui/react"
import billgates from"../billgates.png"

function Header() {
  return (
    <div className='header base-container'>
     <img src={billgates} alt='billgates'/>
     <Heading mt={30} mb={3}>Spend Bill Gates' Money</Heading>
    </div>
  )
}

export default Header