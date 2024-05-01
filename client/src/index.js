import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import UniversityStore from "./store/UniversityStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        university: new UniversityStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);