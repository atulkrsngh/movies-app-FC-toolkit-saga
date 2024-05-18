import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from "./sagas/rootSagas";
import createSagaMiddleware from "redux-saga";
import App from './components/App';
import moviesReducer from '../src/reducers/moviesSlice';
import searchReducer from '../src/reducers/searchSlice';
import './index.css';

const sagaMiddleware = createSagaMiddleware();

const logger = ({ dispatch, getState }) => (next) => (action) => {
  console.log('ACTION', action);
  next(action);
};

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
