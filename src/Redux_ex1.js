import { createSlice, configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';

const CounterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    incrementByAmount: (state, action) => { state.value += action.payload }
  }
});

export const { increment, decrement, incrementByAmount } = CounterSlice.actions;

export const store = configureStore({
  reducer: CounterSlice.reducer
});

function Counter() {
  const count = useSelector((state) => state.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())} style={{ marginRight: '10px' }}>
        Increment
      </button>
      <button onClick={() => dispatch(decrement())} style={{ marginRight: '10px' }}>
        Decrement
      </button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
}

export default Counter;