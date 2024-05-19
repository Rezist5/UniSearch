import {$authHost, $host} from "./index";

export const createPortfolio = async (formData) => {
    console.log(formData)
    const {data} = await $authHost.post('api/portfolio', formData)
    return data;
};



export const fetchPortfolios = async () => {
    const {data} = await $host.get('api/portfolio')
    return data
}

export const fetchPortfolioByEnrolleeId = async (enrolleeId) => {
    const {data} = await $host.get(`api/portfolio/${enrolleeId}`)
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