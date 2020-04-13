import {get} from '@/utils/service';
import { stringify } from 'qs';


// 获取邮箱验证码
export const getPinCode=(email)=>{
    return get(`/user/getPinCode?email=${email}`); 
}

// 登录
export const login=(params)=>{ 
    return get(`/user/login/ByPinCode?${stringify(params)}`); 
}
