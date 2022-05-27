import { useMemo, useState } from "react";
import './Info.scss'

type Props = {
  keys: string[],
  base: string,
}

export const Info:React.FC<Props> = ({ keys, base }) => {
  const [findItems, setFindItems] = useState('');

  const filteredItems = useMemo(() => (keys.filter(item => {
    const findName = item.toLowerCase().includes(findItems.toLowerCase());

    return findName;
  })
  ), [findItems, keys]);
  
  return (
    <div className="info">
      <h2 className="info__title">Base currencies is {base}</h2>
      <h5 className="info__text">For 1 {base} you can get:</h5>
      <input 
        type="text" 
        className="info__input" 
        placeholder="Enter currency name"
        onChange={event => setFindItems(event.target.value)}
      />
      {filteredItems.map((el: string) => (
        <li className="info__item" key={el}>{el}</li>
      ))}
    </div>
  );
}