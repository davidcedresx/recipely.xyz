// const API_URL = 'https://6008ff590a54690017fc2a1b.mockapi.io/api/v1'
const API_URL = "http://localhost:3000";

function getToken() {
    return localStorage.getItem('token')
}

export const Auth = {
    async login(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify({ username, password }),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                });

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },
};

export const Ingredients = {
    async get() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/ingredients`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + getToken(),
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();
                resolve(data);
            } catch (error) {
                console.log(error);
                reject("There is trouble getting your ingredients");
            }
        });
    },
};

export const Recipes = {
    async get() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/recipes/`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + getToken(),
                        "Accept": "application/json",
                    },
                });
                const data = await response.json();
                resolve(data);
            } catch (error) {
                console.log(error);
                reject("There is trouble getting your recipes");
            }
        });
    },
};
