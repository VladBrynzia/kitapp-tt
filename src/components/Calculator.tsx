import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CurrencyExchange from './CurrencyExchange';
import './Calculator.scss'

type Props = {
  currency: object,
  fromCurrency: string,
  setFromCurrency: Dispatch<SetStateAction<string>>,
  toCurrency: string,
  setToCurrency: Dispatch<SetStateAction<string>>,
  course: string,
  setCourse: Dispatch<SetStateAction<string>>
  APIkey: string,
  BASE_URL: string
};

export const Calculator:React.FC<Props> = (
  { 
    currency, 
    fromCurrency, 
    setFromCurrency, 
    toCurrency, 
    setToCurrency, 
    course, 
    setCourse,
    APIkey,
    BASE_URL
  }) => {
  const [currencyFromValue, setCurrencyFromValue] = useState(1); 
  const [currencyToValue, setCurrencyToValue] = useState(true); 
  let to, from;
  
  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null) {
      fetch(`${BASE_URL}?from=${fromCurrency}&api_key=${APIkey}`)
        .then(responce => responce.json())
        .then(data =>
          setCourse(data.results[toCurrency])
        )
    }}, [APIkey, BASE_URL, fromCurrency, setCourse, toCurrency]);

  if (currencyToValue) {
    from = currencyFromValue;
    to = currencyFromValue * +course;
  } else {
    to = currencyFromValue;
    from = currencyFromValue / +course;
  }

  const fromHandelChange = (e: any) => {
    setCurrencyFromValue(e.target.value);
    setCurrencyToValue(true);
  }

  const toHandelChange = (e: any) => {
    setCurrencyFromValue(e.target.value);
    setCurrencyToValue(false);
  }

  const changeFromCur = (e: any) => {
    setFromCurrency(e.target.value)
  }

  const changeToCur = (e: any) => {
    setToCurrency(e.target.value)
  }

  return (
    <div className='container'>
      <h2 className='calc__text'>For</h2>
      <CurrencyExchange 
        currencies={Object.keys(currency)}
        selectCurrency={fromCurrency}
        onChangeCurrency={changeFromCur}
        amount={from}
        onChangeAmount={fromHandelChange}
      />
      <h2 className='calc__text'>you will receive</h2>
      <CurrencyExchange 
        currencies={Object.keys(currency)}
        selectCurrency={toCurrency}
        onChangeCurrency={changeToCur}
        amount={to}
        onChangeAmount={toHandelChange}
      />
    </div>
  );
}
