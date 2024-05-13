import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { MAIN_ROUTE } from "../utils/consts";
import Main from '../pages/Main';
import { Context } from "../index";
import { observer } from "mobx-react-lite";


const AppRouter = observer(() => {
    const { user } = useContext(Context);

    console.log(user);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="/" element={<Main />} />
        </Routes>
    );
});

export default AppRouter;
