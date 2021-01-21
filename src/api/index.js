const API_URL = 'https://6008ff590a54690017fc2a1b.mockapi.io/api/v1'
const DELAY = 1000

export const Auth = {
    async login(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'david' && password === 'hi')
                    resolve({ token: 'abcdefg123' })
                else
                    reject(new Error('invalid credentials'))
            }, DELAY)

        })

    }
}

export const Ingredients = {
    async get() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/ingredients`, { method: 'GET' })
                const data = await response.json()
                resolve(data)
            }
            catch (error) {
                console.log(error)
                reject('There is trouble getting your ingredients')
            }  
        })
    }
}


export const Recipes = {
    async get() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/recipes`, { method: 'GET' })
                const data = await response.json()
                resolve(data)
            }
            catch (error) {
                console.log(error)
                reject('There is trouble getting your recipes')
            }  
        })
    }
}