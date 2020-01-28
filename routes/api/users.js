const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new User
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation 이름 이메일 패스워드 값 입력 여부 확인
    if(!name || !email || !password) {
        return res.status(400).json({ msg: '모든 영역의 값을 입력하세요.'});
    }

    //Check for existing user 회원 존재 여부 확인
    User.findOne({ email })
        .then(user => {
            if(user) 
                return res.status(400).json({ msg: '이미 존재하는 회원입니다.' });

            const newUser = new User({
                name,
                email,
                password
            });

            // Create salt & hash 암호화를 위한 솔트값, 해시값 생성
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

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
        });
});

module.exports = router;