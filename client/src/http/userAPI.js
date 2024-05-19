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
    const response = await $authHost.get('api/user/check');
    const { data } = response;
    localStorage.setItem('token', data.token);
    
    return data;
};

export const getRepresentativeInfo = async (id) => {
    const {data} = await $authHost.get(`api/user/representative/${id}` )
    console.log(data)
    return data
}

export const createAdmin = async (email, password, Fullname) => {
    
    const {data} = await $authHost.post('api/user/createAdmin' , {email, password, Fullname , role: 'ADMIN'})//DODELAT
    localStorage.setItem('token', data.token)
    return data
}

export const createRepresentative = async (email, password, fullName, universityId) => {
    const {data} = await $authHost.post('api/user/createRepresentative', {email, password, fullName, universityId, role: 'REPRESENTATIVE'} )
    localStorage.setItem('token', data.token)
    return data
}

export const logout = async () => {
    const {data} = await $authHost.post('api/user/logout')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const findNameByReview = async (id) => {
    const {data} = await $authHost.get(`api/user/${id}`)
    console.log(data)
    return data
}