import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const sendRequest = async (request) => {
    const {data} = await $authHost.post('api/request', request)
    return data
}

export const answerRequest = async (answer) => {
    const {data} = await $authHost.post('api/request', answer)
    return data
}

export const fetchRequests = async () => {
    const {data} = await $host.get('api/request')
    return data
}