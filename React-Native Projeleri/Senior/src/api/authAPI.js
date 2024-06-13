import config from "../config/config";

export const registerAuth = async (fullname, email,password) =>{
    try {
        const response = await fetch(config.register, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                fullname: fullname,
                username: email,
                password: password
            })

        })

        let responseData = await response.json();
        return responseData;

    } catch (error) {
        console.log('Error fetching data:', error);
    }
}


export const loginAuth = async (email,password) =>{
    try {
        const response = await fetch(config.login, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password
            })

        })

        let responseData = await response.json();
        return responseData;

    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

export const checkAuth = async () =>{
    try {
        const response = await fetch(config.checkAuth, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },

        })

        let responseData = await response.json();
        return responseData;

    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

export const logout = async () =>{
    try {
        const response = await fetch(config.logout, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },

        })

        let responseData = await response.json();
        return responseData;

    } catch (error) {
        console.log('Error fetching data:', error);
    }
}
//--------------------------------------------------------------------------------
export const getMeasurements = async () => {
    try {
        const response = await fetch(config.getMeasurements,{
            method:'GET',
            headers:{
                'Content-type' : 'application/json' 
            },
        });
        let responseData = await response.json();
        return responseData;

    } catch (error) {
        console.log("Error fetching data: ", error);
    }

}

export const updateMeasurements = async (boy,kilo) => {
    try {
        const response = await fetch(config.updateMeasurements, {
            method:'POST',
            headers:{
                'Content-type' : 'application/json',
            },
            body: JSON.stringify({
                kilo: kilo,
                boy: boy
            })
        });

        let responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log("Error fetching data: ", error);
    }

}