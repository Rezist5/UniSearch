import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PORTFOLIO_ROUTE, REPRESENTATIVE_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useNavigate} from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE)
    }
    console.log(user.user);
    return (
        <Navbar bg="dark" variant="dark">
            <Container bg="dark" variant="dark">
                <NavLink style={{color:'white'}} to={MAIN_ROUTE}>UniSearch</NavLink>
                
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        {user.user.role === "ADMIN" &&
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Admin panel
                            </Button>
                        }
                        {user.user.role === "ENROLLEE" &&
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(PORTFOLIO_ROUTE)}
                            >
                                Portfolio
                            </Button>
                        }
                        {user.user.role === "REPRESENTATIVE" &&
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(REPRESENTATIVE_ROUTE)}
                            >
                                Requests
                            </Button>
                        }
                        <Button 
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Sign Out
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Sign In</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
