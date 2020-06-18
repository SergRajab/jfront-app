import React, { useState, useEffect }  from 'react';
import { ListForm } from 'jfront-components';

const App: React.FC = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const cols = [
    {header: "Id", field:"id"},
    {header: "Name", field:"name"},
    {header: "Age", field:"age"}
  ]

  const displayError = (e: any) => {
    if (e !== null) {
      return e.message
    }
    return ''
  }

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    fetch('./data.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(result => {
       setData(result.data);
       setIsFetching(false);
    })
    .catch(e => {
      setIsFetching(false);
      setError(e);
    })
}, []);

  return (
    isFetching ? (
      <div>... Loading</div>
    ) : (
      error!==null ? (
      <div>Error: {displayError(error)}</div>
      ) : (
    <>
    <ListForm columns={cols} data={data}/>
    </>
      )
      
    )
  );
}

export default App;
