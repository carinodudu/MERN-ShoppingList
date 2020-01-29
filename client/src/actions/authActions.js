import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// Check token & load user 토큰 확인 및 사용자 데이터 가져오기
export const loadUser = () => (dispatch, getState) => {
    // User loading 
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// Register User 회원 가입
export const register = ({ name, email, password }) => dispatch => {
    // Headers 헤더 정보 설정
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body 요청 메시지
    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users', body, config)
        .then(res => dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        });
}

// Login User 로그인
export const login = ({ email, password }) => dispatch => {
    // Headers 헤더 정보 설정
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body 요청 메시지
    const body = JSON.stringify({ email, password });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        });
}

// Logout User 로그아웃
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
}

// Set up config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage 로컬 저장소에서 토큰 가져오기
    const token = getState().auth.token;

    // Headers 헤더 정보 설정
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers 토큰이 존재하면, 헤더 정보 추가
    if(token) {
        config.headers['x-auth-token'] = token;
    }
    
    return config;
};