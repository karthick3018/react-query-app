import React from 'react';
import useListDataFetch from './useListFetch';
import UpdateDetails from './editDelete';

function App() {
  const [clickedValues, setClickedValues] = React.useState(null);
  const { status, data } = useListDataFetch();

  const handleListClick = (eachData) => {
    setClickedValues(eachData);
  }

  return (
    <>
      <h3>{`CURD Operations using React-Query ${status === 'loading' ? '...loading...' : ''}`}</h3>
      <div className="container">
        <div>
          <ol>
            {data && data.map(eachData => {
              return (
                <li key={eachData.id} onClick={() => handleListClick(eachData)}>
                  <p>{eachData.title}</p>
                </li>
              )
            })}
          </ol>
        </div>
        <div>
          <p><b>Click on any list to edit!</b></p>
          {clickedValues &&
            <UpdateDetails
              values={clickedValues}
            />
          }
        </div>
      </div>
    </>

  );
}

export default App;
