import React, {Redirect, useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import { LOGIN_ROUTE } from './utils/consts';

const App = observer(() => {
  const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
              const data = await check();
              user.setUser(true);
              user.setIsAuth(true);
            } catch (error) {
              console.error('Authentication Error:', error.message);
              user.setUser(false); 
              user.setIsAuth(false); 
              console.log("catch");
            } finally {
              setLoading(false);
            }
          }
          fetchData();
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
    });

export default App;
