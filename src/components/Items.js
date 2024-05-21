import React, { useEffect } from 'react'
import ItemCard from './ItemCard'
import Masonry from "react-masonry-css"
import { useDispatch, useSelector } from 'react-redux'
import { getItemsAsync, selectAllItemsLength, selectAllPagesLength, selectError, selectHasNextPage, selectItems, selectNextPage, selectStatus } from '../redux/items/itemsSlice'
import { Box, Button, Text } from '@chakra-ui/react'

function Items() {


    const status =  useSelector(selectStatus)
    const items = useSelector(selectItems)
    const error = useSelector(selectError)
    const nextPage = useSelector(selectNextPage)
    const hasNextPage = useSelector(selectHasNextPage)
    const allPages = useSelector(selectAllPagesLength)
    const allItemsLenght = useSelector(selectAllItemsLength)




    const dispatch = useDispatch()

    useEffect(()=> {
        if(status ==="idle") {
            dispatch(getItemsAsync(1))
        }
    },[dispatch,status])




    if(status ==="failed") return <div>Error: {error}</div>


  return (
    <div style={{padding:0}}  className='base-container'>

<Box p={2} background="radial-gradient(#ffd7e6, #ff7cba)" mb={6}>
<Text>Current page: {hasNextPage ? nextPage : allPages}</Text>
        <Text>All pages: {allPages}</Text>
        <Text>All items: {allItemsLenght}</Text>
</Box>
        

       <Masonry
  breakpointCols={3}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">


 
       {items.map((item) => {
        return <ItemCard key={item.id} item={item}/>
       })}
  
</Masonry>



       {status ==="loading" && <div>Loading...</div>}

       {hasNextPage && status !== "loading" && (
        <Button colorScheme='pink' onClick={()=> dispatch(getItemsAsync(nextPage+1))}>Load More({nextPage+1})</Button>
       )}
       

       {!hasNextPage && <div>There is nothing to be shown</div>}

    </div>
  )
}

export default Items