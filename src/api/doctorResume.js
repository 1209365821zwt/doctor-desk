import {
    get,
    // post
} from '@/utils/service';
// import { stringify } from 'qs';

// 线上拜访、内容分享、微信聊天、医生关念
export const getDoctorVisitInfo = (customerCode, productId) => {
    return get(`/vr/info/${customerCode}/${productId}`);
}