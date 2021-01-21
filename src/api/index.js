const DELAY = 1000

export const Auth = {
    async login(username, password) {
        console.log('API[login]: ', ...arguments)

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