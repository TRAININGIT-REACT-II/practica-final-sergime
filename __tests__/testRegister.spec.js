
describe('#Register', () => { 
    it('Creates user correctly', (done) => {

        const username = (Math.random() + 1).toString(36).substring(8)
        const password = (Math.random() + 1).toString(36).substring(8)

        const url = 'http://localhost:3000/api/register'
        const config = {
            method: "POST",
            body: JSON.stringify({
              username,
              password,
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        }

        console.log('config', config)

        const register = () => {
            fetch(url, config)
            .then(res => res.json())
            .then(json => {
                const json = 

                console.log('json', json)

                expect(json).toHaveProperty('id');
                expect(json).toHaveProperty('username');
                expect(json).toHaveProperty('token');
            })

            done()
        }

        register()
    })
 });