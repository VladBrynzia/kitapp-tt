/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Calculator } from './components/Calculator';
import { Info } from './components/Info';
import './App.scss'

const APIkey = '782acbc638-1061f25b40-rci7yd';
const BASE_URL = 'https://api.fastforex.io/fetch-all';
const URL_CurrencyName = 'https://api.fastforex.io/currencies'

export const App:React.FC = () => {
  const [list, setList] = useState([]);
  const [base, setBase] = useState('')
  const [nameOfCurrency, setNameOfCurrency] = useState([]);
  const [currency, setCurrency] = useState({}); 
  const [fromCurrency, setFromCurrency] = useState(''); 
  const [toCurrency, setToCurrency] = useState(''); 
  const [course, setCourse] = useState('');

  const arrKeysList = Object.keys(list)
  const arrValueList = Object.values(list);
  const arrName = Object.values(nameOfCurrency)

  for (let i = 0; i < arrName.length; i++) {
    arrKeysList[i] = arrName[i] + '(' + arrKeysList[i] + ') = ' + arrValueList[i];
  }

  useEffect(() => {
    fetch(`${BASE_URL}?api_key=${APIkey}`)
      .then(responce => responce.json())
      .then(data => {    
        const uah = Object.keys(data.results)[134];

        setCurrency(data.results);
        setFromCurrency(data.base);
        setToCurrency(uah);
        setCourse(data.results[uah]);  
        setList(data.results);
        setBase(data.base);
    })
  }, []);

  useEffect(() => {
    fetch(`${URL_CurrencyName}?api_key=${APIkey}`)
      .then(responce => responce.json())
      .then(data => {    
        setNameOfCurrency(data.currencies);
    })
  }, []);
 
  return (
    <div className="container">
      <header className='nav'>
        <Link to="/" className="nav-link">Info</Link>
        <Link to="/exchange" className="nav-link">Calculate currency</Link>
      </header>
      <Routes>
        <Route path='/' element={<Info keys={arrKeysList} base={base} />}/>
        <Route 
          path='/exchange' 
          element={
            <Calculator 
              currency={currency} 
              fromCurrency={fromCurrency} 
              setFromCurrency={setFromCurrency}
              toCurrency={toCurrency} 
              setToCurrency={setToCurrency}
              course={course} 
              setCourse={setCourse}
              APIkey={APIkey}
              BASE_URL={BASE_URL}
            />
          }
        />
      </Routes>
    </div>
  )
};
