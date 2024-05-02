import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createSubject = async (subject) => {
    const {data} = await $authHost.post('api/subject', subject)
    return data
}

export const fetchSubjects = async () => {
    const {data} = await $host.get('api/subject')
    return data
}

export const createDirection = async (direction) => {
    const {data} = await $authHost.post('api/direction', direction)
    return data
}

export const fetchDirections = async () => {
    const {data} = await $host.get('api/direction')
    return data
}

export const createCountry = async (country) => {
    const {data} = await $authHost.post('api/country', country)
    return data
}

export const fetchCountries = async () => {
    const {data} = await $host.get('api/country')
    return data
}

export const createUniversity = async (university) => {
    const {data} = await $authHost.post('api/university', university)
    return data
}

export const fetchUniversities = async () => {
    const {data} = await $host.get('api/university')
    return data
}

export const fetchOneUniversity = async (id) => {
    const {data} = await $host.get('api/university', id)
    return data
}

export const UpdateUniversity = async (id, university) => {
    const {data} = await $authHost.put('api/university', id, university)
    return data
}

export const DeleteUniversity = async (id) => {
    const {data} = await $authHost.delete('api/university', id)
    return data
}

export const createReview = async (review) => {
    const {data} = await $authHost.post('api/review', review)
    return data
}

export const fetchReviews = async (universityId) => {
    const {data} = await $host.get('api/review', universityId)
    return data
}

export const createScholarship = async (scholarship) => {
    const {data} = await $authHost.post('api/scholarship', scholarship)
    return data
}

export const fetchScholarships = async () => {
    const {data} = await $host.get('api/scholarship')
    return data
}