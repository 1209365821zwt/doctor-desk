import {get,post} from '@/utils/service';
import { stringify } from 'qs';

export const pageList=(params)=>{ 
    return get(`/backGift/pageList?${stringify(params)}`); 
}
//积分明细接口
export const getIntegralRecord=(params)=>{ 
    return get(`/enterpriseSaleIntegralRecord/getIntegralRecord?${stringify(params)}`); 
}
//兑换记录接口
export const changeList=(params)=>{ 
    return get(`/backGiftExchange/pageList?${stringify(params)}`); 
}
//兑换礼品详情
export const detailList=(params)=>{ 
    return get(`/backGift/getGift/${params}`); 
}
//积分兑换
export const exchangeGift=(params)=>{ 
    return post(`/backGift/exchangeGift`,params); 
}
//get  获取用户积分
export const getUserScore=()=>{ 
    return get(`/enterpriseSaleIntegral/getUserScore`); 
}
//get  排行榜
export const ranking=(stat,params)=>{ 
    return get(`/enterpriseSaleIntegral/ranking/${stat}?${stringify(params)}`); 
}
//get 排行榜所在的名次
export const rankingNo=(params)=>{ 
    return get(`/enterpriseSaleIntegral/rankingNo/${params}`); 
}