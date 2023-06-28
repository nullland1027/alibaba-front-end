// 客户端
const http = require('http');
const express = require('express');
const socketIO = require('socket.io').Server;

const app = new express();
const server = http.createServer(app);
const io = new socketIO(server);

// 保存客户端连接
const sockets = {};

// 保存消息历史记录
const historys = [];

app.use(express.static('./web'));

// 校验
io.use((socket, next) => {
    console.log('a client incoming');
    const name = socket.handshake.query.name;
    const password = socket.handshake.query.password;
    if (!name) {
        console.log('拒绝连接：没有账户名');
        next(new Error('empty'));
        return;
    }
    if (password !== '1') {
        console.log('拒绝连接：密码错误');
        next(new Error('error'));
        return;
    }
    next();
})

io.on('connection', (socket) => {
    console.log('a user connected');

    // 监听客户端发送来的信息
    const name = socket.handshake.query.name;

    // 存储连接
    sockets[name] = socket;
    
    // 发送消息
    socket.on('sendMessage', (content) => {
        console.log('receive a message', name, content);

        // 定义message消息格式
        const message = {
            time: Date.now(),
            sender: name,
            content: content
        }
        // 保存消息历史记录
        historys.push(message);

        // 广播消息
        socket.broadcast.emit('receiveMessage', message);
    });

    socket.on('getHistory', (fn) => {
        fn(historys);
    });

    //	 监听到连接断开
    socket.on("disconnect", (reason) => {
        delete sockets[name];
        console.log('a user disconnect: ', name, reason);
        io.sockets.emit('online', Object.keys(sockets));
    });

    // 广播给所有人(包括自己)
    io.sockets.emit('online', Object.keys(sockets));
});

server.listen(3000);