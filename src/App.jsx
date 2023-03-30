import { useReducer, useRef, useState } from 'react';
import './App.css';
const calHandler = (state, action) => {
  const { num1, num2 } = action.payload;
  switch (action.type) {
    case 'Add':
      return { num: +num1 + +num2 };
    case 'Sub':
      return { num: +num1 - +num2 };
    case 'Multi':
      return { num: +num1 * +num2 };
    case 'Div':
      return { num: (+num1 / +num2).toFixed(2) };
    case 'Reset':
      return { num: 0 };
    default:
      return state;
  }
};
const initialState = {
  num1: 0,
  num2: 0,
};
function App() {
  const num1Ref = useRef();
  const num2Ref = useRef();
  const [state, dispatch] = useReducer(calHandler, initialState);
  const dispatchHandler = (type) => {
    dispatch({
      type,
      payload: {
        num1: num1Ref.current.value,
        num2: num2Ref.current.value,
      },
    });
    if (type === 'Reset') {
      num1Ref.current.value = 0;
      num2Ref.current.value = 0;
    }
  };
  return (
    <div className='App'>
      <h1>Calculator</h1>
      <hr />
      <div>
        <div className='inputDiv'>
          <input type='text' placeholder='Num-1' ref={num1Ref} />
          <input type='text' placeholder='Num-1' ref={num2Ref} />
        </div>
        <div className='btnDiv'>
          <button className='Add' onClick={() => dispatchHandler('Add')}>
            Add
          </button>
          <button className='Sub' onClick={() => dispatchHandler('Sub')}>
            Sub
          </button>
          <button className='Multi' onClick={() => dispatchHandler('Multi')}>
            Multi
          </button>
          <button className='Div' onClick={() => dispatchHandler('Div')}>
            Div
          </button>
        </div>
      </div>
      <h2>{state.num ?? 0}</h2>
      <button onClick={() => dispatchHandler('Reset')}>Reset</button>
    </div>
  );
}

export default App;
