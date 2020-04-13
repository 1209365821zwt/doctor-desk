import {
    get,
    post
} from '@/utils/service';
import {
    stringify
} from 'qs';

// 获取医院列表
export const queryHospitalList = (params) => {
    return get(`/vr/hospital/getList?${stringify(params)}`);
}

// 获取职称列表
export const queryTitlelList = () => {
    return get(`/vr/title/getList`);
}

// 获取职务列表
export const queryPositionlList = () => {
    return get(`/vr/position/getList`);
}

// 获取科室列表
export const queryDepartmentlList = (params) => {
    return get(`/vr/department/getList?${stringify(params)}`);
}


// 新增医生
export const addDoctor = (params) => {
    return post(`/enterpriseHcp/insert`,params);
}

// 获取医生信息
export const getDoctor = (customerCode) => {
    return get(`/enterpriseHcp/get/${customerCode}`);
}

// 修改医生信息
export const updateDoctor = (params) => {
    return post(`/enterpriseHcp/update`,params);
}

