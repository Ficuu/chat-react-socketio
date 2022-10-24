import express from "express"
import morgan from 'morgan'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import cors from 'cors'

import { PORT } from "./config.js"

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

app.use(cors())
app.use(morgan('dev'))

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('message', message => { 
        socket.broadcast.emit('message', {
            body: message,
            from: "User"
        })
    })
})

server.listen(PORT)
console.log('server listen in port ' + PORT)