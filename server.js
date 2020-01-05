const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config 데이터베이스 설정
const db = require('./config/keys').mongoURI;

// Connect to Mongo 몽고DB 연결 
// {useNewUrlParser: true, useUnifiedTopology: true} 버전 문제로 삽입해야 함
 mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// Use Routes
app.use('/api/items', items);

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