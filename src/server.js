import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js'
import { Database } from './database.js'

//const users = [] usado antes da criação do arquivo de database

const database = new Database()

const server = http.createServer(async (req, res) => {

    const { method, url } = req

    await json(req, res)

   /* const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try{

        req.body = JSON.parse(Buffer.concat(buffers).toString())

    }catch{
        
        req.body = null
    }

    */


    if (method === 'GET' && url === '/users'){

        const users = database.select('users')
        return res
            //.setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users'){

        const { nome, email } = req.body

        const user = {
            id: randomUUID(),
            nome,
            email,
        }
       database.insert("users", user)
        return res.writeHead(201).end()
    }
    return res.writeHead(404).end('404 NOT FOUND')
})



server.listen(3333)