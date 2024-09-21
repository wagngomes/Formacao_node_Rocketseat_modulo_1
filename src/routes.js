import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')
            return res
                //.setHeader('Content-type', 'application/json')
                .end(JSON.stringify(users))

        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const { nome, email } = req.body

            const user = {
                id: randomUUID(),
                nome,
                email,
            }
            database.insert("users", user)
            return res.writeHead(201).end()


        }
    }
]