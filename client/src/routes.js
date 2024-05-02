import Admin from "./pages/Admin";
import {ADMIN_ROUTE, PORTFOLIO_ROUTE, UNIVERSITY_ROUTE, REPRESENTATIVE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE} from "./utils/consts";
import Portfolio from "./pages/Portfolio";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import UniversityPage from "./pages/UniversityPage";
import Representative from "./pages/Representative";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: PORTFOLIO_ROUTE,
        Component: Portfolio
    },
    {
        path: REPRESENTATIVE_ROUTE,
        Component: Representative
    },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: UNIVERSITY_ROUTE + '/:id',
        Component: UniversityPage
    },
]