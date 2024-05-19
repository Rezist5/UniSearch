import {$authHost, $host} from "./index";

export const createSubject = async (subject) => {
    const {data} = await $authHost.post('api/subject', subject)
    return data
}

export const fetchSubjects = async () => {
    const {data} = await $host.get('api/subject')
    return data
}

export const fetchSubjectsByUniversity = async (universityId) => {
    const {data} = await $host.get(`api/subject/${universityId}`)
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

export const fetchUniversityDirections = async (id) => {
    const { data } = await $host.get(`api/university/${id}/directions`);
    return data;
  };
export const createCountry = async (country) => {
    const {data} = await $authHost.post('api/country', country)
    return data
}

export const fetchCountries = async () => {
    const {data} = await $host.get('api/country')
    return data
}

export const createCity = async (city) => {
    const {data} = await $authHost.post('api/city', city)
    return data
}

export const fetchOneCity = async (id) => {
    const {data} = await $host.get(`api/city/${id}`)
    return data
}

export const createUniversity = async (university) => {
    const {data} = await $authHost.post('api/university', university)
    return data
}

export const fetchUniversities = async (filters) => {
    
    const { data } = await $host.get('api/university',  {params:filters} );
    return data;
}

export const fetchOneUniversity = async (id) => {
    const {data} = await $host.get(`api/university/${id}`)
    return data
}

export const updateUniversity = async (id, updatedUniversity) => {
    const { data } = await $authHost.put(`api/university/${id}`, updatedUniversity);
    return data;
}

export const DeleteUniversity = async (id) => {
    const {data} = await $authHost.delete(`api/university/${id}`)
    return data
}

export const createReview = async (reviewData, universityId) => {
    
    const { data } = await $authHost.post(`api/review/${universityId}`, reviewData);
    return data;
}

export const fetchReviews = async (universityId, direction) => {
    const {data} = await $host.get(`api/review/${universityId}/${direction}`)
    return data
}

export const fetchReplies = async (reviewIds) => {
    const { data } = await $host.get(`api/review/replies`, {params:reviewIds} );
    
    return data;
};


export const createScholarship = async (scholarship) => {
    const {data} = await $authHost.post('api/scholarship', scholarship)
    return data
}

export const fetchScholarshipsByUniversity = async (universityId) => {
    const {data} = await $host.get(`api/scholarship/${universityId}`)
    return data
}

export const createLanguage = async (language) => {
    const {data} = await $authHost.post('api/language', language)
    return data
}

export const fetchLanguages = async () => {
    const {data} = await $host.get('api/language')
    return data
}

export const fetchUniversityLanguages = async (id) => {
    const { data } = await $host.get(`api/university/${id}/languages`);
    return data;
  };
  export const fetchCountryByCityId = async (cityId) => {
    const { data } = await $host.get(`api/country/by-city/${cityId}`);
    return data;
  };
export const addDirectionToUniversity = async (universityId, directionId) => {
    const { data } = await $host.post(`api/direction/${directionId}/university/${universityId}`);   
    return data;
};

export const addLanguageToUniversity = async (universityId, languageId) => {
    const { data } = await $host.post(`api/direction/${languageId}/university/${universityId}`);
    return data;
};

export const fetchCitiesByCountry = async (countryId) => {
    const {data} = await $host.get(`api/city/country/${countryId}`)
    return data
}

export const fetchImagesByUniversity = async (universityId) => {
    const {data} = await $host.get(`api/university/${universityId}/images`)
    return data
}

export const addImageToUniversity = async (universityId, image) => {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await $authHost.post(`api/university/${universityId}/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data;
}


