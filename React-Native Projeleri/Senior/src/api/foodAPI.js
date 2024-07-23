const clientID = 'cadd77774a1c470f850355c8d7b1a119';
const clientSecret = '6de43411c6884b96a7ebc60d8925e556';

const getToken = async () => {
    const response = await fetch('https://oauth.fatsecret.com/connect/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
        },
        body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
};


const fetchDataByCategory = async (category) => {
    const token = await getToken();

    const response = await fetch('https://platform.fatsecret.com/rest/server.api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            method: 'food_categories.get.v2',
            search_expression: category,
            format: 'json',
        }),
    });

    const data = await response.json();
    return data;
};

export { fetchDataByCategory };



