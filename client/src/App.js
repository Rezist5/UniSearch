import React, {Redirect, useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import { LOGIN_ROUTE } from './utils/consts';
import 'bootstrap/dist/css/bootstrap.min.css';
import {jwtDecode} from "jwt-decode";

const App = observer(() => {
  const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      async function fetchData() {
          try {
              const token = localStorage.getItem('token');
              if (token) {
                  const decoded = jwtDecode(token);
                  console.log(decoded)
                  user.setUser(decoded);
                  user.setIsAuth(true);
              } else {
                  const tokenFromServer = await check();
                  localStorage.setItem('token', tokenFromServer);
                  const decoded = jwtDecode(tokenFromServer);
                  user.setUser(decoded);
                  user.setIsAuth(true);
              }
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
