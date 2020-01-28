const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config 데이터베이스 설정
const db = config.get('mongoURI');

// Connect to Mongo 몽고DB 연결 
// {useNewUrlParser: true, useUnifiedTopology: true} 버전 문제로 삽입해야 함
 mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true, 
        useUnifiedTopology: true
    }) // Adding new mongo url parser, create index url parser과 create index 정보 설정  
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Port Config 포트 설정
const port = process.env.PORT || 5000;

// 서버 구동
app.listen(port, () => console.log(`Server started on port ${port}`));