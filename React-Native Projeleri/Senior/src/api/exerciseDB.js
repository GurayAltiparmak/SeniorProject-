import { rapidAPIKey } from "../config/exerciseConfig";

const baseUrl = 'https://work-out-api1.p.rapidapi.com';


const apiCall = async(url, params) => {
    try {
        
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': rapidAPIKey,
                'x-rapidapi-host': 'work-out-api1.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options) //axios.request(options);
        const data = await response.json();
        return data;
        
    } catch (err) {
        console.log('error: ', err.message);
    }
}



export const fetchExercisesByBodyPart = async(bodyPart) => {
    const url = await apiCall(baseUrl+`/search?Muscles=${bodyPart}`)
    return url;
}