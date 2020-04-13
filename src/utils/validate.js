import {
    Toast
} from 'vant'
/**
 * 是否为空
 * @param val 
 * @returns {Boolean}
 */

export function isEmpty(val) {
    if (val === '' || val === null || val === undefined) {
        return true
    }
    return false
}

/**
 * 是否为手机号
 * @param phone 
 * @returns {Boolean}
 */
export function checkPhone(phone) {
    if (isEmpty(phone)) {
        Toast('手机号不能为空')
        return false
    } else if (!(/^1[3456789]\d{9}$/.test(phone))) {
        Toast('请输入正确的手机号')
        return false;
    }
    return true
}

/**
 * 6位验证码判断
 * @param code 
 * @returns {Boolean}
 */
export function checkCode(code) {
    if (isEmpty(code)) {
        Toast('验证码不能为空')
        return false
    } else if (!(/^\d{5}$/.test(code))) {
        // console.log(code)
        Toast('请输入正确的验证码')
        return false;
    }
    return true
}

/**
 * 验证邮箱
 * @param email 
 * @returns {Boolean}
 */
export function checkEmail(email) {
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if (isEmpty(email)) { //输入不能为空
        Toast('邮箱不能为空')
        return false;
    } else if (!reg.test(email)) { //正则验证不通过，格式不对
        Toast("请输入正确的邮箱!");
        return false;
    }
    return true;
}