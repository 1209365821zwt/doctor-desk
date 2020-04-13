import {
    get,
    post
} from '@/utils/service';
// import { stringify } from 'qs';


 // 拜访登记提交
 export const visitSubmit=(params)=>{
    return post(`/visit/registration`,params)
 }

 // 获取招募结果列表
 export const queryRecruitList=()=>{
    return get(`/recruitPurpose/getList`)
 }