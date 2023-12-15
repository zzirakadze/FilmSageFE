const API_URL = 'http://10.0.2.2:5000';

export const registerUser = async (userData) => {
    // try {
    //     console.log("start")
        const url = `${API_URL}/auth/register`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        const data = await response.json();
        console.log(data)
        // console.log("data.statusCode: " + data.statusCode)
        // console.log("status code", data.statusCode)
        return data;
    // } catch (error) {
    //     console.error('Registration Error:', error);
    // }
};

export const loginUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Login Error:', error);
    }
};
