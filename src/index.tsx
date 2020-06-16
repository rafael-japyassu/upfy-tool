import React from 'react';
import ReactDOM from 'react-dom';
import 'react-notifications-component/dist/theme.css'
import './index.scss';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { rootReducer } from './store';

const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

