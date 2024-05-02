import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password, Fullname, age, school, cityId, grade) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ENROLLEE', Fullname, age, school, cityId, grade})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const createAdmin = async (email, password) => {
    const {data} = await $authHost.post('api/user/createAdmin' , {email, password, role: 'ADMIN'})//DODELAT
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const createRepresentative = async (email, password) => {
    const {data} = await $authHost.post('api/user/createRepresentative', {email, password, role: 'REPRESENTATIVE'} )//DODELAT
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const logout = async () => {
    const {data} = await $authHost.post('api/user/logout')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}