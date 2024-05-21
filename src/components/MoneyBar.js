import React from 'react'
import { useSelector } from 'react-redux';
import { selectMoney } from '../redux/money/moneySlice';

function MoneyBar() {



    const money = useSelector(selectMoney)


    const editedMoney = new Intl.NumberFormat('tr-TR').format(money);


  return (
    <div className='base-container money-bar'>
        ${editedMoney}
    </div>
  )
}

export default MoneyBar