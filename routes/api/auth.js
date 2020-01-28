const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Simple validation 이메일 패스워드 값 입력 여부 확인
    if(!email || !password) {
        return res.status(400).json({ msg: '모든 영역의 값을 입력하세요.'});
    }

    //Check for existing user 회원 존재 여부 확인
    User.findOne({ email })
        .then(user => {
            if(!user) 
                return res.status(400).json({ msg: '존재하지 않는 회원입니다.' });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch)
                        return res.status(400).json({ msg: '비밀번호가 틀립니다.'});

                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        )
                });
        });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;