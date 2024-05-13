import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import UniversityStore from './store/UniversityStore';

export const Context = createContext();
console.log(process.env.REACT_APP_API_URL)

const root = document.getElementById('root');
const appRoot = ReactDOM.createRoot(root);
appRoot.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      university: new UniversityStore(),
    }}
  >
    <App />
  </Context.Provider>
);