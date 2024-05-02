import {$authHost, $host} from "./index";

export const createPortfolio = async (portfolio) => {
    const {data} = await $authHost.post('api/portfolio', portfolio)
    return data
}

export const fetchPortfolios = async () => {
    const {data} = await $host.get('api/portfolio')
    return data
}

export const fetchOnePortfolio = async (id) => {
    const {data} = await $host.get(`api/portfolio/${id}`)
    return data
}

export const UpdatePortfolio = async (id, portfolio) => {
    const {data} = await $host.put(`api/portfolio/${id}`, portfolio)
    return data
} //?

export const DeletePortfolio = async (id) => {
    const {data} = await $host.delete(`api/portfolio/${id}`)
    return data
}