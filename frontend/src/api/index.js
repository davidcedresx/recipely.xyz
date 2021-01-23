// const API_URL = 'https://6008ff590a54690017fc2a1b.mockapi.io/api/v1'
const API_URL = 'http://localhost:3000'

function getToken() {
    return localStorage.getItem('token')
}

function getHeaders() {
    return {
        Authorization: 'Bearer ' + getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
}

export const Auth = {
    async login(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: getHeaders(),
                })

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
}

export const Ingredients = {
    async get() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/ingredients`, {
                    method: 'GET',
                    headers: getHeaders(),
                })
                const data = await response.json()
                resolve(data)
            } catch (error) {
                console.log(error)
                reject('There is trouble getting your ingredients')
            }
        })
    },
    async create(recipe) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/ingredients/`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(recipe),
                })

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
    async update(id, recipe) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/ingredients/${id}`, {
                    method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify(recipe),
                })

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
    async delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/ingredients/${id}`, {
                    method: 'DELETE',
                    headers: getHeaders(),
                })

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
}

export const Recipes = {
    async get() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/recipes/`, {
                    method: 'GET',
                    headers: getHeaders(),
                })
                const data = await response.json()
                resolve(data)
            } catch (error) {
                console.log(error)
                reject('There is trouble getting your recipes')
            }
        })
    },
    async create(recipe) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/recipes/`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(recipe),
                })

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
    async update(id, recipe) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/recipes/${id}`, {
                    method: 'PUT',
                    headers: getHeaders(),
                    body: JSON.stringify(recipe),
                })

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
    async delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/recipes/${id}`, {
                    method: 'DELETE',
                    headers: getHeaders(),
                })

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
}

export const Usages = {
    async create(usage) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/usages/`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(usage),
                })

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
    async delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/usages/${id}`, {
                    method: 'DELETE',
                    headers: getHeaders(),
                })

                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const data = await response.json()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },
}
