import React, { ChangeEventHandler } from 'react';
import './Ex.scss'

type Props = {
  currencies: string[],
  amount: number,
  selectCurrency: string,
  onChangeCurrency: ChangeEventHandler<HTMLSelectElement>
  onChangeAmount: ChangeEventHandler<HTMLInputElement>
}

export const CurrencyExchange:React.FC<Props> = (
  { 
    currencies, 
    amount, 
    selectCurrency, 
    onChangeCurrency, 
    onChangeAmount 
  }) => {

  return (
    <div className='ex'> 
      <input 
        type="number"
        className='ex__input'
        placeholder='Enter your amount'
        value={amount}
        onChange={onChangeAmount}
      />
      <select 
        className='ex__select'
        value={selectCurrency}
        onChange={onChangeCurrency}
      >
        {
          currencies.map(el => (
            <option className='ex__select-item' key={el}>{el}</option>
          ))
        }
      </select>
    </div>
  );
}

export default CurrencyExchange;