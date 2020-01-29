import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS 에러 상태 정보 페이로드에 포함하여 반환
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
};

// CLEAR ERRORS 에러 상태 정보 초기화
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};