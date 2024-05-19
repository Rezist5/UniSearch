import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const sendRequest = async (universityId, enrolleeId, description) => {
    const {data} = await $authHost.post(`api/request/${universityId}/${enrolleeId}`, {description})
    return data
}

export const answerRequest = async (requestId, status, description) => {
    const {data} = await $authHost.post(`api/request/${requestId}/${status}`, description)
    return data
}

export const fetchRequestsByEnrolleeId = async (enrolleeId) => {
    const {data} = await $host.get(`api/request/enrollee/${enrolleeId}`)
    return data
}

export const fetchRequestsByUniversityId = async (universityId) => {
    const {data} = await $host.get(`api/request/university/${universityId}`)
    return data
}