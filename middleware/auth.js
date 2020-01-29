const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token 토큰 존재 여부 확인
    if(!token) {
        return res.status(401).json({ msg: '토큰이 없어, 인증이 거부되었습니다.'});
    }

    try {
        // Verify token 토큰 정보 확인
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Add user from Payload 페이로드로부터 사용자 정보 추가
        req.user = decoded;
        next();
    } 
    catch(e) {
        res.status(400).json({ msg: '토큰이 유효하지 않습니다.'});
    }
}

module.exports = auth;