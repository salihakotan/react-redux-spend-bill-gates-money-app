import { Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectReceipts } from '../redux/receipts/receiptsSlice'

function Receipt() {
        
    


    const receipts = useSelector(selectReceipts)

    const total = receipts.reduce((acc,obj) => acc + obj.price * obj.count,0)


    console.log(total)
    console.log("siparişler" ,receipts)

  return (
    <div style={{backgroundColor:"white", margin:"30px 0"}} className='base-container'>
        <Heading fontSize="25px">Your Receipt</Heading>


        {receipts.map((receipt) => {
            return <li key={receipt.id}>{receipt.name} - x {receipt.count} - ${receipt.price * receipt.count} - {receipt.id}</li>
        })}

        <hr/>

        <Text fontSize="20px" fontWeight="bold">TOTAL: <Text display="inline" color='green'> ${total.toFixed(2)}</Text></Text>


    </div>
  )
}

export default Receipt