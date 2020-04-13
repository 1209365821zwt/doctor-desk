import {get,post} from '@/utils/service';
// import { stringify } from 'qs';

export const getNum=()=>{ 
    return get(`/visit/get/target/num`); 
}
//post 更多招募
export const getVisitList=(params)=>{ 
    return post(`/visit/list`,params); 
}
//get 设置拜访目标数
export const setVisitNum=(params)=>{ 
    return get(`/visit/set/num/${params}`); 
}