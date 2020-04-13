import {
    get,
    post
} from '@/utils/service';
import { stringify } from 'qs';

// 获取医生列表
export const queryDoctorList = (params) => {
    return post('/index/hcp/search/list', params)
}

// 获取搜索历史
export const querySearchHistory = (params) => {
    return get(`/index/content/search/list?${stringify(params)}`)
}

//  删除搜索历史
export const delHistory = (productId) => {
    return get(`/index/del/search/history/${productId}`)
}
