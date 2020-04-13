import {
    get,
    post
} from '@/utils/service';
import { stringify } from 'qs';


// 获取产品列表
export const queryProduct = () => {
    return get('/product/list');
}

// 获取医生列表
export const queryDoctorList = (params) => {
    return post('/index/hcp/list', params)
}

// 查询所有标签
export const queryLabelList = ()=>{
    return get('/backLabel/getLabelList')
}
//get 医生详情
export const doctorDetail=(code,params)=>{
   return get(`/hcp/portrait/details/${code}?${stringify(params)}`)
}
//get 查询医生标签列表
export const getLabel=(params)=>{
    return get(`/enterpriseHcpLabelRef/getLabelsByHcp/${params}`)
 }
 //post 设置标签
 export const settingLabels=(id,params)=>{
    return post(`/enterpriseHcpLabelRef/settingLabels/${id}`,params)
 }
 //get 查询所有标签
 export const getLabelList=()=>{
    return get(`/backLabel/getLabelList`)
 }
 //post 拜访记录
 export const getVisitList=(params)=>{
    return post(`/vr/visit/list`,params)
 }
 //get 拜访代表
 export const getRepList=(params)=>{
    return get(`/vr/rep/${params}`)
 }
 //post 内容分享列表分页
 export const getContentList=(params)=>{
   return post(`/vr/list`,params)
}
//post 微信聊天记录
export const getTalkList=(params)=>{
   return post(`/vr/getList`,params)
}
//get 医生观念
export const getproduct=(code,id)=>{
   return get(`/vr/product/${code}/${id}`)
}