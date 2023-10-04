require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const path = require('path');
const sequelize = require('./db');
const router = require('./routes');
const http = require('http');

const PORT = process.env.PORT || 6000;

const app = express();
const server = http.createServer(app);

app.use(express.json({extended: true}));
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use('/images', express.static(path.join(__dirname, 'images')));        

app.use('/api', router);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('private_message', ({ recipientId, message }) => {
      const recipientSocket = io.sockets.sockets.get(recipientId);
      if (recipientSocket) {
        recipientSocket.emit('private_message', message);
      }
    });
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ start ☢ error:', error)        
    }
};

start();