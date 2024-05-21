import React, { useState } from 'react'
import {Text,Grid, Input, Button, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper} from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { decreaseMoney, increaseMoney, selectMoney } from '../redux/money/moneySlice'
import { deleteReceipt, newReceipt, selectReceipts, updateReceipt } from '../redux/receipts/receiptsSlice'
import { nanoid } from '@reduxjs/toolkit'

function ItemCard({item}) {



    const [itemCount,setItemCount] = useState(0)




    const money = useSelector(selectMoney)
    const receipts = useSelector(selectReceipts)

    // const decreaseAmount = item.price * itemCount

    const dispatch = useDispatch()


    const handleClickBuy = () => {
        if(item.price > money) {
            alert("bakiye yetersiz")
        } else {
            
            dispatch(decreaseMoney(item.price))
            // console.log("count",itemCount)
             
            // console.log("count 2 ",itemCount)

            updateOrNewReceipt(1)
            setItemCount(itemCount+1)
        }
    }

    const handleClickCell = () => {
        if(itemCount>=1) {
            dispatch(increaseMoney(item.price))
            updateOrNewReceipt(-1)
            setItemCount(itemCount-1)
        }
    }

    const inputChange = (event) => { 

        const value = Number(event.target.value)
    
        setItemCount(value)

        if(value > itemCount) {
            //buy
          const count = value - itemCount






          if( item.price * count > money) {
            alert("bakiye yetersiz")
            console.log("itemcount will : ", Number(event.target.value.substr(0, event.target.value.length - 1)))
            setItemCount(Number(event.target.value.substr(0, event.target.value.length - 1)))
            // setItemCount(previousValue)
        } else {

      

          
            console.log("count for input", count)
            console.log("countitem for input", itemCount)



            //check if there is a receipt with same id

            updateOrNewReceipt(count)

            

            const decreaseAmount = count * item.price
            dispatch(decreaseMoney(decreaseAmount))
        }
        } else if(itemCount>value){
            //sell
            const _count = itemCount - value //howmuchdecrease
            dispatch(updateReceipt({id:item.id,count:(-_count)}))


           
            const increaseAmount = _count * item.price
            dispatch(increaseMoney(increaseAmount))
        }


      


        

       
    }

    const updateOrNewReceipt = (_count) => {
        if(receipts.find((_item)=> _item.id === item.id)) {
            console.log("aynı indexten sipariş zaten var. güncellenecek")
            dispatch(updateReceipt({id:item.id,count:_count}))
        } else {
            console.log("aynı indexten sipariş yok. yeni olacak")
            console.log("item",item)
            dispatch(newReceipt({id:item.id,name:(item.title.substring(0,17) + "..."), count:_count,price:item.price}))

        }
    }

        


  return (
    <div className='item-card'>
         <img src={item.image} alt={item.title} />
        <Text fontWeight="bold" mt={4} fontSize={20}>{item.title.substring(0,17) + "..."}</Text>
        <Text fontWeight="bold" fontSize={20} color="green">{item.price} $</Text>
        <Grid mt={3} templateColumns="repeat(3,1fr)">
            <Button isDisabled={itemCount <= 0} onClick={()=>handleClickCell()} colorScheme='red' mr={2}>Sell</Button>
            <Input textAlign="center" value={itemCount} onChange={(event) => inputChange(event)} />
         

            <Button isDisabled={item.price > money} colorScheme='green' ml={2} onClick={()=> handleClickBuy()}>Buy</Button>
        </Grid>
    </div>
  )
}

export default ItemCard