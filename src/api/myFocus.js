import {get,post} from '@/utils/service';
import { stringify } from 'qs';


//get 我的关注列表
export const myFollows=(params)=>{
    return get(`/enterpriseSaleFollow/myFollows?${stringify(params)}`); 
}
//post 关注医生
export const followHcp=(hcpId,productId)=>{
    return post(`/enterpriseSaleFollow/followHcp/${hcpId}/${productId}`); 
}

